using Financial.Domain.Models.Base;

namespace Financial.Domain.Models
{
    public class PaymentMethod : BaseEntity
    {
        public string Name { get; set; }

        public IList<Expense> Expense { get; set; }
    }
}