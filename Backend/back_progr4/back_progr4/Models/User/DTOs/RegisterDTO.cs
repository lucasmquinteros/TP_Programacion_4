using System.ComponentModel.DataAnnotations;

namespace back_progr4.Models.User.DTOs
{
    public class RegisterDTO
    {
        [Required]
        [MinLength(2)]
        public string UserName { get; set; } = null!;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        [MinLength(8)]
        public string Password { get; set; } = null!;

        [Required]
        [MinLength(8)]
        public string ConfirmPassword { get; set; } = null!;
    }
}
