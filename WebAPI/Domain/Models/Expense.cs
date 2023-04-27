﻿using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Financial.Domain.Models
{
    public class Expense : BaseEntity
    {
        public Expense()
        {
            Category = new Category();
            PaymentMethod = new PaymentMethod();
        }
        
        public DateTimeOffset? DueDate { get; set; }

        [Required]
        public DateTimeOffset PurchaseDate { get; set; }

        [Required]
        public string Description { get; set; } = string.Empty;

        [NotMapped]
        public string DisplayDescription { get; set; } = string.Empty;

        [Required]
        [Column(TypeName = "Money")]
        public decimal Amount { get; set; } = 0;

        [Range(1, int.MaxValue)]
        public int Installments { get; set; } = 1;
        public bool Periodic { get; set; } = false;
        public bool Paid { get; set; } = false;
        public Guid? RecurrentId { get; set; } = null;

        [Required]
        public virtual Category Category { get; set; }

        [Required]
        public virtual PaymentMethod PaymentMethod { get; set; }

        [JsonIgnore]
        public virtual User User { get; set; }
    }
}