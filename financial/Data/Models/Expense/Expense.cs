using System.ComponentModel.DataAnnotations.Schema;

namespace Financial.Data.Models.Expense
{
    public class Expense : BaseEntity
    {
        public DateTimeOffset DueData { get; set; }

        public DateTimeOffset PurchaseDate { get; set; }

        [ForeignKey(nameof(CategoryId))]
        public Guid CategoryId { get; set; }

        [ForeignKey(nameof(PaymentMethodId))]
        public Guid PaymentMethodId { get; set; }

        public string Description { get; set; } = "No Description";

        [Column(TypeName = "Money")]
        public decimal Amount { get; set; } = 0;

        public Category? Category { get; set; }

        public PaymentMethod? PaymentMethod { get; set; }
    }
}
