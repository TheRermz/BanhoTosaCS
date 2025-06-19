namespace banhotosa.Models
{

    public enum StatusAtendimento
    {
        Pendente,
        Concluido,
        Cancelado
    }
    public class Atendimento
    {
        public int ID { get; set; }
        public DateOnly Data { get; set; }
        public TimeOnly Hora { get; set; }
        public string? Observacao { get; set; }
        public StatusAtendimento Status { get; set; } = StatusAtendimento.Pendente;
        // FK
        public int PetID { get; set; }
        public int ServicoID { get; set; }
        // Navigation properties
        public required Pet Pet { get; set; }
        public required Servico Servico { get; set; }
    }
}
