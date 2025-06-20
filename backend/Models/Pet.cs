using System.Text.Json.Serialization;

namespace banhotosa.Models
{
    public class Pet
    {
        public int ID { get; set; }
        public required string Nome { get; set; }
        public string? Raca { get; set; }

        //puxar os atendimentos
        public List<Atendimento>? Atendimentos { get; set; } = new();

        // Foreign key
        public int ClienteID { get; set; }

        // Navigation property
        [JsonIgnore]
        public Cliente? Cliente { get; set; }
    }
}
