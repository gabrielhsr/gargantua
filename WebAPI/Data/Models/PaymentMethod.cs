using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace Financial.Data.Models
{
    public class PaymentMethod : BaseEntity
    {
        public PaymentMethod()
        {
            Expenses = new List<Expense>();
        }

        [Required]
        public string Name { get; set; } = string.Empty;
        public string? Bank { get; set; }
        public DateTimeOffset? DueDate { get; set; }

        [JsonIgnore]
        public virtual IList<Expense> Expenses { get; set; }
    }
}
