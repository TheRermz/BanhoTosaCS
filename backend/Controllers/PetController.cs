using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using banhotosa.Data;
using banhotosa.Models;

namespace banhotosa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PetController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PetController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/pets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pet>>> GetPets()
        {
            return await _context.Pets.Include(p => p.Atendimentos)
                .ToListAsync();
        }

        // GET: api/pets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Pet>> GetPet(int id)
        {
            var pet = await _context.Pets
                .Include(p => p.Atendimentos)
                .FirstOrDefaultAsync(p => p.ID == id);
            if (pet == null)
            {
                return NotFound();
            }
            return pet;
        }

        // GET TOTAL: api/pets/total
        [HttpGet("total")]
        public async Task<ActionResult<int>> GetTotalPets()
        {
            var total = await _context.Pets.CountAsync();
            return Ok(total);
        }

        // POST: api/pets
        [HttpPost]
        public async Task<ActionResult<Pet>> PostPet(Pet pet)
        {
            _context.Pets.Add(pet);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPet), new { id = pet.ID }, pet);
        }

        // PUT: api/pets/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPet(int id, Pet pet)
        {
            if (id != pet.ID)
            {
                return BadRequest();
            }
            _context.Entry(pet).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PetExists(id))
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

        // DELETE: api/pets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePet(int id)
        {
            var pet = await _context.Pets.FindAsync(id);
            if (pet == null)
            {
                return NotFound();
            }
            _context.Pets.Remove(pet);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool PetExists(int id)
        {
            return _context.Pets.Any(e => e.ID == id);
        }
    }
}
