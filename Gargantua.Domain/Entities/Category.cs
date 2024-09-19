namespace Gargantua.Domain.Entities
{
    public class Category : BaseEntity<Guid>
    {
        public string Name { get; set; }

        public string Icon { get; set; }

        public string Color { get; set; }

        public virtual IList<Expense> Expense { get; set; }
    }
}