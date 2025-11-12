namespace back_progr4.Models.Reserva.DTOs
{
    public class UpdateReservaDTO
    {
        public int? Cantidad { get; set; }
        public DateTime? DateTime { get; set; }
        public int? TurnoId { get; set; }

        public double? Precio {  get; set; }
    }
}
