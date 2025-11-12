using back_progr4.ENUMS;

namespace back_progr4.Models.Turno.DTOs
{
    public class TurnoDTO
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; }
        public TimeOnly HoraInicio { get; set; }
        public TimeOnly HoraFin { get; set; }
        public int CupoMax { get; set; }
        public int CuposDisponibles { get; set; }
        public string Estado { get; set; }
    }
}
