using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using banhotosa.Data;
using banhotosa.Models;

namespace banhotosa.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServicosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ServicosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/servicos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Servico>>> GetServicos()
        {
            return await _context.Servicos.ToListAsync();
        }

        // GET: api/servicos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Servico>> GetServico(int id)
        {
            var servico = await _context.Servicos.FindAsync(id);

            if (servico == null)
                return NotFound();

            return servico;
        }

        // POST: api/servicos
        [HttpPost]
        public async Task<ActionResult<Servico>> PostServico(Servico servico)
        {
            _context.Servicos.Add(servico);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetServico), new { id = servico.ID }, servico);
        }

        // PUT: api/servicos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutServico(int id, Servico servico)
        {
            if (id != servico.ID)
                return BadRequest();

            _context.Entry(servico).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Servicos.Any(e => e.ID == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/servicos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteServico(int id)
        {
            var servico = await _context.Servicos.FindAsync(id);
            if (servico == null)
                return NotFound();

            _context.Servicos.Remove(servico);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
