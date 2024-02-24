using Financial.Domain.Models.Base;

namespace Financial.Domain.Models
{
    public class Expense : BaseEntity
    {
        public Guid IdCategory { get; set; }

        public Guid IdPaymentMethod { get; set; }

        public string Description { get; set; }

        public decimal Amount { get; set; }

        public DateTimeOffset? DueDate { get; set; }

        public DateTimeOffset PurchaseDate { get; set; }

        public Category Category { get; set; }

        public PaymentMethod PaymentMethod { get; set; }
    }
}
