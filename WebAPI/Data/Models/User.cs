using System.ComponentModel.DataAnnotations;

namespace Financial.Data.Models
{
    public class User: BaseEntity
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string PasswordHash { get; set; }

        public string PasswordSalt { get; set; }

        public virtual IList<Expense> Expenses { get; set; }

        public virtual IList<Income> Incomes { get; set; }
    }
}
