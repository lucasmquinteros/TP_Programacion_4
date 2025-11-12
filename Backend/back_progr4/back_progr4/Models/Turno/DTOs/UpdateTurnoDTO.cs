namespace back_progr4.Models.Turno.DTOs
{
    namespace back_progr4.Models.Turno.DTOs
    {
        public class UpdateTurnoDTO
        {
           public DateTime? DateTime { get; set; }
            public TimeSpan? HoraInicio { get; set; }
            public TimeSpan? HoraFin { get; set; }
            public int? Capacidad { get; set; }
        }
    }

}
