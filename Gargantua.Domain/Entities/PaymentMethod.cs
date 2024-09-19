namespace Gargantua.Domain.Entities
{
    public class PaymentMethod : BaseEntity<Guid>
    {
        public string Name { get; set; }

        public virtual IList<Expense> Expense { get; set; }
    }
}