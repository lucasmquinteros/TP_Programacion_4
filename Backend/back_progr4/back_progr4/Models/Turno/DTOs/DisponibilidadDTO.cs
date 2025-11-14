namespace back_progr4.Models.Turno.DTOs
{
    public class DisponibilidadDTO
    {
        public DateTime Fecha { get; set; }
        public TimeOnly HoraInicio { get; set; }
        public TimeOnly HoraFin { get; set; }
        public int CuposDisponibles { get; set; }
    }
}
