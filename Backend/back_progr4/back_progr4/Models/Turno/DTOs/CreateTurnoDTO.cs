using System.ComponentModel.DataAnnotations;

namespace back_progr4.Models.Turno.DTOs
{
    public class CreateTurnoDTO
    {
        [Required]
        public DateTime DateTime { get; set; }
        [Required]

        public TimeOnly HoraInicio { get; set; }
        [Required]

        public TimeOnly HoraFin { get; set; }

        public int Capacidad { get; set; }
    }
}
