using Financial.Data.DTO;
using Financial.Data.Models;
using Financial.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Financial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpensesController : BaseController<Expense>
    {
        private readonly IExpenseService service;

        public ExpensesController(IExpenseService service) : base(service)
        {
            this.service = service;
        }

        [HttpGet("periods")]
        public async Task<IList<Period>> GetPeriods()
        {
            return await service.GetPeriods();
        }

        [HttpGet("expensesByPeriod")]
        public async Task<IList<Expense>> GetExpensesByPeriod(int month, int year)
        {
            return await service.GetExpensesByPeriod(new Period { Month= month, Year = year });
        }
    }
}
