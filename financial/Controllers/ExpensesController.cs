using AutoMapper;
using Financial.Data.DTOs;
using Financial.Data.Models.Expense;
using Financial.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Financial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpensesController : BaseController<Expense, ExpenseDto>
    {
        public ExpensesController(IBaseRepository<Expense> repository, IMapper mapper) : base(repository, mapper)
        {
        }
    }
}
