using System.Text.Json.Serialization;

namespace Financial.Data.Models
{
    public class Category : BaseEntity
    {
        public Category()
        {
            Expenses = new List<Expense>();
        }

        public string? Name { get; set; }

        [JsonIgnore]
        public virtual IList<Expense> Expenses { get; set; }
    }
}
