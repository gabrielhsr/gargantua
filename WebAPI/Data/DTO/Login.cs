using System.ComponentModel.DataAnnotations;

namespace Financial.Data.DTO
{
    public class Login
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
