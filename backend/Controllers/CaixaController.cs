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

        // GET: api/caixa/por-mes
        [HttpGet("por-mes")]
        public async Task<ActionResult<IEnumerable<object>>> GetCaixaPorMes()
        {
            var agrupado = await _context.Caixa
                .GroupBy(c => new { c.DataHora.Year, c.DataHora.Month })
                .Select(g => new
                {
                    ano = g.Key.Year,
                    mes = g.Key.Month,
                    total = g.Sum(c => c.Tipo == TipoCaixa.Entrada ? c.Valor : -c.Valor)
                })
                .OrderByDescending(g => g.ano)
                .ThenByDescending(g => g.mes)
                .ToListAsync();

            return Ok(agrupado);
        }

        // GET: api/caixa/mes-atual
        [HttpGet("mes-atual")]
        public async Task<ActionResult<decimal>> GetCaixaMesAtual()
        {
            var agora = DateTime.UtcNow;
            var totalMes = await _context.Caixa
                .Where(c => c.DataHora.Year == agora.Year && c.DataHora.Month == agora.Month)
                .SumAsync(c => c.Tipo == TipoCaixa.Entrada ? c.Valor : -c.Valor);

            return Ok(totalMes);
        }


        // GET: api/caixa/total -- retornar somente o valor total
        [HttpGet("total")]
        public async Task<ActionResult<decimal>> GetTotalCaixa()
        {
            var total = await _context.Caixa
                .SumAsync(c => c.Tipo == TipoCaixa.Entrada ? c.Valor : -c.Valor);

            return Ok(total);
        }

        // POST: api/caixa
        [HttpPost]
        public async Task<ActionResult<Caixa>> PostCaixa(Caixa caixa)
        {
            if (caixa.Valor < 0)
                return BadRequest("O valor não pode ser negativo.");

            caixa.Valor = Math.Abs(caixa.Valor); // Garante valor positivo

            _context.Caixa.Add(caixa);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCaixa), new { id = caixa.ID }, caixa);
        }


        // PUT: api/caixa/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCaixa(int id, Caixa caixa)
        {
            if (id != caixa.ID)
                return BadRequest();

            if (caixa.Valor < 0)
                return BadRequest("O valor não pode ser negativo.");

            caixa.Valor = Math.Abs(caixa.Valor); // Garante valor positivo

            _context.Entry(caixa).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CaixaExists(id))
                    return NotFound();
                else
                    throw;
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
