using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Financial.Domain.Models
{
    public class Expense : Movement
    {
        public Expense()
        {
            Category = new Category();
            PaymentMethod = new PaymentMethod();
        }
        
        public DateTimeOffset DueDate { get; set; }

        [NotMapped]
        public DateTimeOffset? DisplayDueDate { get; set; }

        [Required]
        public DateTimeOffset PurchaseDate { get; set; }

        [NotMapped]
        public DateTimeOffset? DisplayPurchaseDate { get; set; }

        [Required]
        public virtual Category Category { get; set; }

        [Required]
        public virtual PaymentMethod PaymentMethod { get; set; }
    }
}