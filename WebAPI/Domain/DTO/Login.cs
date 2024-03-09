using System.ComponentModel.DataAnnotations;

namespace Financial.Domain.DTO
{
    public class Login
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }

    public class AuthRes
    {
        public string Token { get; set; }
    }
}
