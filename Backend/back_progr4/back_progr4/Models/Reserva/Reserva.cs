using back_progr4.ENUMS;
using back_progr4.Models.Turno;
using back_progr4.Models.User;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace back_progr4.Models.Reserva
{
    public class Reserva
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey("User")]

        public int UserId { get; set; } 
        public User.User User { get; set; } = null!;
        [ForeignKey("Turno")]
        public int TurnoId { get; set; } 
        public Turno.Turno Turno { get; set; } = null!;

        [Range(1,50)]
        public int Cantidad { get; set; }

        public DateTime FechaReserva { get; set; }

        public double Precio { get; private set; } = 10000;
        public string Estado { get; set; } = ESTADO.CONFIRMADA;

    }
}
