using System.ComponentModel.DataAnnotations;
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

        [Range(1, int.MaxValue)]
        public int Installments { get; set; } = 1;
        public bool Periodic { get; set; } = false;

        [Required]
        public virtual Category Category { get; set; }

        [Required]
        public virtual PaymentMethod PaymentMethod { get; set; }
    }
}