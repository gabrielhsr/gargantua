using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Financial.Domain.Models
{
    public class Movement : BaseEntity
    {
        [Required]
        public string Description { get; set; } = string.Empty;

        [NotMapped]
        public string DisplayDescription { get; set; } = string.Empty;

        [Required]
        [Column(TypeName = "Money")]
        public decimal Amount { get; set; } = 0;

        public bool Periodic { get; set; } = false;

        public Guid? RecurrentId { get; set; } = null;

        [Range(1, int.MaxValue)]
        public int Installments { get; set; } = 1;

        [JsonIgnore]
        public virtual User User { get; set; }

        [Range(1, int.MaxValue)]
        public int MonthInterval { get; set; } = 1;

        public bool Paid { get; set; } = false;
    }
}
