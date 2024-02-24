﻿using Financial.Domain.Models.Base;

namespace Financial.Domain.Models
{
    public class User : BaseEntity
    {
        public string Email { get; set; }

        public string PasswordHash { get; set; }

        public string PasswordSalt { get; set; }

        public virtual IList<Expense> Expenses { get; set; }

        //public virtual IList<Income> Incomes { get; set; }
    }
}
