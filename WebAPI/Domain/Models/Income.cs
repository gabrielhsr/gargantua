using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Financial.Domain.Models
{
    public class Income : Movement
    {
        [Required]
        public DateTimeOffset PaymentDate { get; set; }

        [Required]
        public string Payer { get; set; } = string.Empty;
    }
}