namespace Financial.Data.Models
{
    public class PaymentMethod : BaseEntity
    {
        public PaymentMethod()
        {
            Expenses = new List<Expense>();
        }

        public string? Name { get; set; }
        public virtual IList<Expense> Expenses { get; set; }
    }
}
