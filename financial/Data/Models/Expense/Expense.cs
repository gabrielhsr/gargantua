using System.ComponentModel.DataAnnotations.Schema;

namespace Financial.Data.Models.Expense
{
    public class Expense : BaseEntity
    {
        public DateTimeOffset DueData { get; set; }
        public DateTimeOffset PurchaseDate { get; set; }
        public Category? Category { get; set; }
        public PaymentMethod? PaymentMethod { get; set; }
        public string? Description { get; set; }

        [Column(TypeName = "Money")]
        public decimal? Amount { get; set; }

    }
}
