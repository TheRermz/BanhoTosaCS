namespace banhotosa.Models
{
    public class Cliente
    {
        public int ID { get; set; }
        public required string Nome { get; set; }

        public string Telefone { get; set; } = string.Empty;

        // Lista de pets
        public List<Pet>? Pets { get; set; } = new();
    }
}
