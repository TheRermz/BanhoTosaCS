using Microsoft.EntityFrameworkCore;
using banhotosa.Models;

namespace banhotosa.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Pet> Pets { get; set; }
        public DbSet<Servico> Servicos { get; set; }
        public DbSet<Atendimento> Atendimentos { get; set; }
        public DbSet<Caixa> Caixa { get; set; }
    }
}
