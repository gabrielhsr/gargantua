using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Financial.Data.Models
{
    public class Income : BaseEntity
    {
        [Required]
        public DateTimeOffset PaymentDate { get; set; }

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        [Column(TypeName = "Money")]
        public decimal Amount { get; set; } = 0;

        public bool Periodic { get; set; } = false;

        public Guid? RecurrentId { get; set; } = null;
    }
}