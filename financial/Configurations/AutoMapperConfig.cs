using AutoMapper;
using Financial.Data.DTOs;
using Financial.Data.Models;
using System.Diagnostics.Metrics;

namespace Financial.Configurations
{
    public class AutoMapperConfig: Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<Expense, ExpenseDto>().ReverseMap();
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<PaymentMethod, PaymentMethodDto>().ReverseMap();
        }
    }
}
