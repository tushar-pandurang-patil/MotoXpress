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
using Microsoft.AspNetCore.Identity;

namespace FinalProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BikesController : ControllerBase
    {
        private readonly MotoXpressFinalContext _context;
        private readonly IMapper _mapper;

        public BikesController(MotoXpressFinalContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Bikes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bike>>> GetBikes([FromQuery] int? pickupCityId)
        {
            // Fetch bikes based on pickup city ID if provided
            var bikesQuery = _context.Bikes.AsQueryable();

            if (pickupCityId.HasValue)
            {
                bikesQuery = bikesQuery.Where(b => b.AvailableCityId == pickupCityId.Value && b.IsAvailable == 1);
            }

            var bikes = await bikesQuery.ToListAsync();

            // Map the Bike entities to BikeDTOs
            //var bikeDtos = _mapper.Map<IEnumerable<BikeDTO>>(bikes);

            return Ok(bikes);
        }

        // GET: api/Bikes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Bike>> GetBike(int id)
        {
            var bike = await _context.Bikes.FindAsync(id);

            if (bike == null)
            {
                return NotFound();
            }

            return bike;
        }

        // PUT: api/Bikes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBike(int id, BikeDTO bikeDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Map the DTO to the Bike entity
            var bike = _mapper.Map<Bike>(bikeDto);

            // Set the BikeId to the provided id
            bike.BikeId = id;

            _context.Entry(bike).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BikeExists(id))
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

        // POST: api/Bikes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Roles = "admin")]
        [HttpPost]
        public async Task<ActionResult<Bike>> PostBike(BikeDTO bikeDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var bike = _mapper.Map<Bike>(bikeDto);

            bike.BikeId = 0;

            _context.Bikes.Add(bike);
            await _context.SaveChangesAsync();

            var createdUserDto = _mapper.Map<BikeDTO>(bike);
            return CreatedAtAction("GetBike", new { id = bike.BikeId }, bike);
        }

        // DELETE: api/Bikes/5
        [Authorize(Roles = "admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBike(int id)
        {
            var bike = await _context.Bikes.FindAsync(id);
            if (bike == null)
            {
                return NotFound();
            }

            _context.Bikes.Remove(bike);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BikeExists(int id)
        {
            return _context.Bikes.Any(e => e.BikeId == id);
        }
    }
}
