namespace banhotosa.Models
{

    public enum TipoCaixa
    {
        Entrada,
        Saida
    }
    public class Caixa
    {
        public int ID { get; set; }
        public TipoCaixa Tipo { get; set; } // Ex: Entrada, Saída
        public decimal Valor { get; set; } = 0.00m;
        public DateTime DataHora
        {
            get => _dataHora;
            set => _dataHora = DateTime.SpecifyKind(value, DateTimeKind.Utc);
        }
        public string? Descricao { get; set; } // Descrição opcional para entradas/saídas

        private DateTime _dataHora;
    }
}
