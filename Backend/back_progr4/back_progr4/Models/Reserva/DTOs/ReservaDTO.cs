using back_progr4.ENUMS;
using System.ComponentModel.DataAnnotations;

namespace back_progr4.Models.Reserva.DTOs
{
    public class ReservaDTO

    {
        public string Id { get; set; }
        [Range(1, 50)]
        public int Cantidad { get; set; }

        public DateTime FechaReserva { get; set; }
        public string Estado { get; set; } = ESTADO.CONFIRMADA;
    }
}
