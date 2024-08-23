using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FinalProject.Models;
using AutoMapper;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using AuthenticationPlugin;
using MotoXpressFinalProject.Models;

namespace FinalProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly MotoXpressFinalContext _context;
        private readonly IMapper _mapper;
        private readonly JwtSettings _jwtSettings;

        public UsersController(MotoXpressFinalContext context, IMapper mapper, IOptions<JwtSettings> options)
        {
            _context = context;
            _mapper = mapper;
            _jwtSettings = options.Value;
        }

        // GET: api/Users
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, UserDTO userDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Map the DTO to the User entity
            var user = _mapper.Map<User>(userDto);

            // Set the UserId to the provided id
            user.UserId = id;

            user.EmailId = user.EmailId.ToLower();

            // Assign the role using the enum
            if (Enum.IsDefined(typeof(Role), userDto.Role))
            {
                user.Role = userDto.Role.ToString();
            }
            else
            {
                return BadRequest("Invalid role specified.");
            }

            // Hash the password
            user.Password = BCrypt.Net.BCrypt.HashPassword(userDto.Password);

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users/Register
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("Register")]
        public async Task<ActionResult<User>> Register(UserDTO userDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Map the DTO to the User entity
            var user = _mapper.Map<User>(userDto);

            var userWithSameEmail = _context.Users.Where(u => u.EmailId == user.EmailId).SingleOrDefault();
            if (userWithSameEmail != null) {
                return BadRequest("User with same email id already exists.");
            }
            
            user.UserId = 0;

            user.EmailId = user.EmailId.ToLower();

            user.Role = Role.customer.ToString();

            // Hash the password
            user.Password= BCrypt.Net.BCrypt.HashPassword(userDto.Password);

            // Add the new user to the context
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Map the newly created user back to a DTO
            var createdUserDto = _mapper.Map<UserDTO>(user);

            // Return the created user information
            return CreatedAtAction("GetUser", new { id = user.UserId }, createdUserDto);
        }

        // DELETE: api/Users/5
        [Authorize(Roles = "admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        // POST: api/Users/Login
        [HttpPost("Login")]
        public async Task<IActionResult> Authenticate([FromBody] UserAuthenticateDTO userAuthenticateDto)
        {
            var user = await this._context.Users.FirstOrDefaultAsync(item => item.EmailId == userAuthenticateDto.EmailId.ToLower());
            if (user == null) return Unauthorized();

            // Verify the password
            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(userAuthenticateDto.Password, user.Password);
            if (!isPasswordValid) return Unauthorized();

            //Generate Token
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.UTF8.GetBytes(this._jwtSettings.SecurityKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] 
                { 
                    new Claim(ClaimTypes.Email, user.EmailId), 
                    new Claim(ClaimTypes.Role, user.Role.ToString()) 
                }),
                Expires = DateTime.Now.AddMinutes(10),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            string finalToken = tokenHandler.WriteToken(token);

            return Ok(new {
                Token = finalToken,
                Role = user.Role,
                EmailId = userAuthenticateDto.EmailId,
                UserId = user.UserId
            });
        }

        // POST: api/Users/RevokeToken
        [Authorize]
        [HttpPost("RevokeToken")]
        public async Task<IActionResult> RevokeToken([FromBody] string token)
        {
            if (string.IsNullOrWhiteSpace(token))
                return BadRequest("Token is required");

            if (!_context.Revokedtokens.Any(rt => rt.Token == token))
            {
                var revokedToken = new Revokedtoken
                {
                    Token = token,
                    RevokedAt = DateTime.UtcNow
                };

                _context.Revokedtokens.Add(revokedToken);
                await _context.SaveChangesAsync();
            }

            return Ok();
        }

        private bool IsTokenRevoked(string token)
        {
            return _context.Revokedtokens.Any(rt => rt.Token == token);
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }

        
    }
}
