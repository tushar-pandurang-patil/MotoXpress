using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FinalProject.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using MotoXpressFinalProject.Models;


namespace FinalProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserprofilesController : ControllerBase
    {
        private readonly MotoXpressFinalContext _context;
        private readonly IMapper _mapper;

        public UserprofilesController(MotoXpressFinalContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Userprofiles
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Userprofile>>> GetUserprofiles()
        {
            var userProfiles = _context.Userprofiles
                           .Include(up => up.City);
            return await userProfiles.ToListAsync();
        }

        // GET: api/Userprofiles/5
        [Authorize(Roles = "admin,customer,approver")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Userprofile>> GetUserprofile(int id)
        {
            var userprofile = await _context.Userprofiles.FindAsync(id);

            if (userprofile == null)
            {
                return Ok(new { message = "User profile not found", userprofile = (Userprofile)null });
            }

            return userprofile;
        }

        // PUT: api/Userprofiles/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Roles = "admin,customer,approver")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserprofile(int id, UserprofileDTO userprofileDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Map the DTO to the Userprofile entity
            var userprofile = _mapper.Map<Userprofile>(userprofileDto);

            // Set the UserId to the provided id
            userprofile.UserId = id;

            _context.Entry(userprofile).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserprofileExists(id))
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

        // POST: api/Userprofiles
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Roles = "admin,customer,approver")]
        [HttpPost]
        public async Task<ActionResult<Userprofile>> PostUserprofile(UserprofileDTO userprofileDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Map the DTO to the Userprofile entity
            var userprofile = _mapper.Map<Userprofile>(userprofileDto);

            _context.Userprofiles.Add(userprofile);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserprofileExists(userprofile.UserId))
                {
                    return Conflict();
                }
                else if (!UserExists(userprofile.UserId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUserprofile", new { id = userprofile.UserId }, userprofile);
        }

        // DELETE: api/Userprofiles/5
        [Authorize(Roles = "admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserprofile(int id)
        {
            var userprofile = await _context.Userprofiles.FindAsync(id);
            if (userprofile == null)
            {
                return NotFound();
            }

            _context.Userprofiles.Remove(userprofile);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserprofileExists(int id)
        {
            return _context.Userprofiles.Any(e => e.UserId == id);
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
    }
}
