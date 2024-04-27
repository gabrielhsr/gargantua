using System.ComponentModel.DataAnnotations;

namespace Gargantua.Domain.Entities
{
    public class Login
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }

    public class Authorization
    {
        public string Token { get; set; }
    }
}
