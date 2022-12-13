using Financial.Data.Models.Expense;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace Financial.Data.DTOs
{
    public class ExpenseDto
    {
        public DateTimeOffset DueData { get; set; }

        public DateTimeOffset PurchaseDate { get; set; }

        public string Description { get; set; } = "No Description";

        [Column(TypeName = "Money")]
        public decimal Amount { get; set; } = 0;

        public string? CategoryName { get; set; }

        public string? PaymentMethodName { get; set; }
    }
}
