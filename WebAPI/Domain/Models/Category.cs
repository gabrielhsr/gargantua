using Financial.Domain.Models.Base;

namespace Financial.Domain.Models
{
    public class Category : BaseEntity
    {
        public string Name { get; set; }

        public virtual IList<Expense> Expense { get; set; }
    }
}