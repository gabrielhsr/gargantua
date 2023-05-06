using Financial.API.Controllers;
using Financial.Domain.DTO;
using Financial.Domain.Interfaces.Services;
using Financial.Domain.Models;
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
        public IList<Period> GetPeriods()
        {
            return service.GetPeriods();
        }

        [HttpGet("expensesByPeriod")]
        public IList<Expense> GetExpensesByPeriod(int month, int year)
        {
            return service.GetExpensesByPeriod(new Period { Month = month, Year = year });
        }

        [HttpPost("markAsPaid")]
        public async Task<IActionResult> MarkAsPaid([FromBody] IList<ExpensePaid> expenses)
        {
            await service.MarkAsPaid(expenses);

            return Ok();
        }
    }
}
