namespace Gargantua.Domain.Entities
{
    public class Expense : BaseEntity
    {
        public Guid IdCategory { get; set; }

        public Guid IdPaymentMethod { get; set; }

        public Guid IdUser { get; set; }

        public string Description { get; set; }

        public decimal Amount { get; set; }

        public DateTimeOffset? DueDate { get; set; }

        public DateTimeOffset PurchaseDate { get; set; }

        public virtual Category Category { get; set; }

        public virtual PaymentMethod PaymentMethod { get; set; }

        public virtual User User { get; set; }
    }
}
