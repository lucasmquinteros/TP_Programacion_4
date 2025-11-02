namespace back_progr4.Models.User.DTOs
{
    public class LoginResponseDTO
    {
        public string Token { get; set; } = null!;

        public UserWithoutPassDTO User { get; set; } = null!;
    }
}
