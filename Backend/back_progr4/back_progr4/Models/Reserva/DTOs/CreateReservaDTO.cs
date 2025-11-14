using back_progr4.ENUMS;
using System.ComponentModel.DataAnnotations;

namespace back_progr4.Models.Reserva.DTOs
{
    public class CreateReservaDTO
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public DateTime FechaTurno { get; set; }
        [Required]
        public TimeOnly HoraInicioTurno { get; set; }
        [Required]
        [Range(1, 50)]
        public int Cantidad { get; set; }
    }
}
