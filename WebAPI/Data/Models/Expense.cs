using Microsoft.Build.Framework;
using System.ComponentModel.DataAnnotations.Schema;

namespace Financial.Data.Models
{
    public class Expense : BaseEntity
    {
        public Expense()
        {
            Category = new Category();
            PaymentMethod = new PaymentMethod();
        }
        
        public DateTimeOffset? DueDate { get; set; }

        [Required]
        public DateTimeOffset PurchaseDate { get; set; }

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        [Column(TypeName = "Money")]
        public decimal Amount { get; set; } = 0;

        [Required]
        public virtual Category Category { get; set; }

        [Required]
        public virtual PaymentMethod PaymentMethod { get; set; }
    }
}