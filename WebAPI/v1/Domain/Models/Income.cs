using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Financial.v1.Domain.Models
{
    public class Income : Movement
    {
        [Required]
        public DateTimeOffset PaymentDate { get; set; }

        [NotMapped]
        public DateTimeOffset DisplayPaymentDate { get; set; }

        [Required]
        public string Payer { get; set; } = string.Empty;
    }
}