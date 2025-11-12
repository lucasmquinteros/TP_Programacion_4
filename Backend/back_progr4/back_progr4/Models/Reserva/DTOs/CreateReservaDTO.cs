using back_progr4.ENUMS;
using System.ComponentModel.DataAnnotations;

namespace back_progr4.Models.Reserva.DTOs
{
    public class CreateReservaDTO
    {
        [Required]
        [MaxLength(255)]
        public DateTime DateTime { get; set; }

        [Required]
        [MaxLength(255)]
        public int UserId { get; set; }

        [Required]
        [MaxLength(255)]
        public int TurnoId { get; set; }

        [Required]
        [MaxLength(50)]
        public int Cantidad {  get; set; }

        public string Estado = ESTADO.CONFIRMADA;

        public double Precio { get; set; }
    }
}
