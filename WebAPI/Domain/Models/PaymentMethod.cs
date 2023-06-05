using Newtonsoft.Json;

namespace Financial.Domain.Models
{
    public class PaymentMethod : BaseEntity
    {
        public PaymentMethod()
        {
            Expenses = new List<Expense>();
        }

        public string Name { get; set; } = string.Empty;
        public string Bank { get; set; }
        public int? DueDate { get; set; }

        [JsonIgnore]
        public virtual IList<Expense> Expenses { get; set; }
    }
}
