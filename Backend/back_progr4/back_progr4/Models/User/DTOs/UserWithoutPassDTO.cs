namespace back_progr4.Models.User.DTOs
{
    public class UserWithoutPassDTO
    {
        public int Id { get; set; }

        public string UserName { get; set; } = null!;

        public string Email { get; set; } = null!;

        public List<string> Roles { get; set; } = new();

        public List<Reserva.Reserva> Reservas { get; set; } = new();
    }
}
