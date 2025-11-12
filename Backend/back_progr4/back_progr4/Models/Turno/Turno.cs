using back_progr4.ENUMS;
using back_progr4.Models.Reserva;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace back_progr4.Models.Turno
{
    public class Turno
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        // Fecha del turno (día en que ocurre)
        public DateTime Fecha { get; set; }

        // Hora de inicio y fin (solo el tiempo del día)
        public TimeOnly HoraInicio { get; set; }
        public TimeOnly HoraFin { get; set; }

        // Cupo máximo de personas
        public int CupoMax { get; set; } = 50;

        // Estado 
        public string Estado { get; set; } = ESTADO.DISPONIBLE;

        // Navegación opcional a Reservas
        public List<Reserva.Reserva>? Reservas { get; set; }
    }

}
