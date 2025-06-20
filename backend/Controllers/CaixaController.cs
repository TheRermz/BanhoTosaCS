using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using banhotosa.Data;
using banhotosa.Models;

namespace banhotosa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CaixaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CaixaController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/caixa
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Caixa>>> GetCaixas()
        {
            return await _context.Caixa.ToListAsync();
        }

        // GET: api/caixa/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Caixa>> GetCaixa(int id)
        {
            var caixa = await _context.Caixa.FindAsync(id);
            if (caixa == null)
            {
                return NotFound();
            }
            return caixa;
        }

        // POST: api/caixa
        [HttpPost]
        public async Task<ActionResult<Caixa>> PostCaixa(Caixa caixa)
        {
            _context.Caixa.Add(caixa);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCaixa), new { id = caixa.ID }, caixa);
        }

        // PUT: api/caixa/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCaixa(int id, Caixa caixa)
        {
            if (id != caixa.ID)
            {
                return BadRequest();
            }
            _context.Entry(caixa).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CaixaExists(id))
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

        // DELETE: api/caixa/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCaixa(int id)
        {
            var caixa = await _context.Caixa.FindAsync(id);
            if (caixa == null)
            {
                return NotFound();
            }
            _context.Caixa.Remove(caixa);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool CaixaExists(int id)
        {
            return _context.Caixa.Any(e => e.ID == id);
        }
    }
}
