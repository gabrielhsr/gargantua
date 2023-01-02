using System.Text.Json.Serialization;
using Microsoft.Build.Framework;

namespace Financial.Data.Models
{
    public class Category : BaseEntity
    {
        public Category()
        {
            Expenses = new List<Expense>();
        }

        [Required]
        public string Name { get; set; }

        [JsonIgnore]
        public virtual IList<Expense> Expenses { get; set; }
    }
}
