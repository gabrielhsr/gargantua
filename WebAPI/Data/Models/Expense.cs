using Financial.Data.Models;
using System.ComponentModel.DataAnnotations.Schema;

public class Expense : BaseEntity
{
    public Expense()
    {
        Category = new Category();
        PaymentMethod = new PaymentMethod();
    }

    public DateTimeOffset DueDate { get; set; }

    public DateTimeOffset PurchaseDate { get; set; }

    [ForeignKey(nameof(CategoryId))]
    public Guid CategoryId { get; set; }

    [ForeignKey(nameof(PaymentMethodId))]
    public Guid PaymentMethodId { get; set; }

    public string Description { get; set; } = "No Description";

    [Column(TypeName = "Money")]
    public decimal Amount { get; set; } = 0;

    public virtual Category Category { get; set; }

    public virtual PaymentMethod PaymentMethod { get; set; }
}

