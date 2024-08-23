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
    public class RentalrecordsController : ControllerBase
    {
        private readonly MotoXpressFinalContext _context;
        private readonly IMapper _mapper;

        public RentalrecordsController(MotoXpressFinalContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Rentalrecords
        [Authorize(Roles = "admin,customer,approver")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Rentalrecord>>> GetRentalrecords()
        {
            var rentalRecords = await _context.Rentalrecords
                .Include(r => r.User)
                .Include(r => r.PickupCity)
                .Include(r => r.DropOffCity)
                .Include(r => r.Bike) // Include Bike if you need its details too
                .ToListAsync();

            return Ok(rentalRecords);
        }


        // GET: api/Rentalrecords/5
        [Authorize(Roles = "admin,customer,approver")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Rentalrecord>> GetRentalrecord(int id)
        {
            var rentalrecord = await _context.Rentalrecords.FindAsync(id);

            if (rentalrecord == null)
            {
                return NotFound();
            }

            return rentalrecord;
        }

        // PUT: api/Rentalrecords/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Roles = "admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRentalrecord(int id, RentalrecordDTO rentalrecordDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Map the DTO to the User entity
            var rentalrecord = _mapper.Map<Rentalrecord>(rentalrecordDto);

            // Set the RentalRecordId to the provided id
            rentalrecord.RentalRecordId = id;

            _context.Entry(rentalrecord).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RentalrecordExists(id))
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

        // POST: api/Rentalrecords
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Roles = "admin,customer,approver")]
        [HttpPost]
        public async Task<ActionResult<Rentalrecord>> PostRentalrecord(RentalrecordDTO rentalrecordDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var rentalrecord = _mapper.Map<Rentalrecord>(rentalrecordDto);

            rentalrecord.RentalRecordId = 0;

            _context.Rentalrecords.Add(rentalrecord);
            await _context.SaveChangesAsync();

            var createdRentalrecordDto = _mapper.Map<RentalrecordDTO>(rentalrecord);
            return CreatedAtAction("GetRentalrecord", new { id = rentalrecord.RentalRecordId }, createdRentalrecordDto);
        }

        // DELETE: api/Rentalrecords/5
        [Authorize(Roles = "admin,customer,approver")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRentalrecord(int id)
        {
            var rentalrecord = await _context.Rentalrecords.FindAsync(id);
            if (rentalrecord == null)
            {
                return NotFound();
            }

            _context.Rentalrecords.Remove(rentalrecord);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RentalrecordExists(int id)
        {
            return _context.Rentalrecords.Any(e => e.RentalRecordId == id);
        }
    }
}
