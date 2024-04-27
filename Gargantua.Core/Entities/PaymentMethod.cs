namespace Gargantua.Domain.Entities
{
    public class PaymentMethod : BaseEntity
    {
        public string Name { get; set; }

        public virtual IList<Expense> Expense { get; set; }
    }
}