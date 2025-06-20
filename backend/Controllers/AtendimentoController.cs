using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using banhotosa.Data;
using banhotosa.Models;

namespace banhotosa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AtendimentosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AtendimentosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/atendimentos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Atendimento>>> GetAtendimentos()
        {
            return await _context.Atendimentos
                .Include(a => a.Pet)
                .Include(a => a.Servico)
                .ToListAsync();
        }
        // GET: api/atendimentos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Atendimento>> GetAtendimento(int id)
        {
            var atendimento = await _context.Atendimentos
                .Include(a => a.Pet)
                .Include(a => a.Servico)
                .FirstOrDefaultAsync(a => a.ID == id);
            if (atendimento == null)
            {
                return NotFound();
            }
            return atendimento;
        }

        // POST: api/atendimentos
        [HttpPost]
        public async Task<ActionResult<Atendimento>> PostAtendimento(Atendimento atendimento)
        {
            _context.Atendimentos.Add(atendimento);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAtendimento), new { id = atendimento.ID }, atendimento);
        }
        // PUT: api/atendimentos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAtendimento(int id, Atendimento atendimento)
        {
            if (id != atendimento.ID)
                return BadRequest();

            var atendimentoExistente = await _context.Atendimentos
                .Include(a => a.Servico)
                .FirstOrDefaultAsync(a => a.ID == id);

            if (atendimentoExistente == null)
                return NotFound();

            bool virouConcluido =
                atendimento.Status == StatusAtendimento.Concluido &&
                atendimentoExistente.Status != StatusAtendimento.Concluido;

            // Atualiza os dados do atendimento
            atendimentoExistente.Data = atendimento.Data;
            atendimentoExistente.Hora = atendimento.Hora;
            atendimentoExistente.Observacao = atendimento.Observacao;
            atendimentoExistente.Status = atendimento.Status;
            atendimentoExistente.PetID = atendimento.PetID;
            atendimentoExistente.ServicoID = atendimento.ServicoID;

            if (virouConcluido && atendimentoExistente.Servico != null)
            {
                var novaEntrada = new Caixa
                {
                    Tipo = TipoCaixa.Entrada,
                    Valor = atendimentoExistente.Servico.Preco,
                    DataHora = DateTime.UtcNow,
                    Descricao = $"Atendimento #{atendimentoExistente.ID} concluído"
                };

                _context.Caixa.Add(novaEntrada);
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/atendimentos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAtendimento(int id)
        {
            var atendimento = await _context.Atendimentos.FindAsync(id);
            if (atendimento == null)
            {
                return NotFound();
            }
            _context.Atendimentos.Remove(atendimento);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        private bool AtendimentoExists(int id)
        {
            return _context.Atendimentos.Any(e => e.ID == id);
        }
    }
}
