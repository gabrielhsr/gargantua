using Financial.v1.Domain.DTO;
using Financial.v1.Domain.Interfaces.Services;
using Financial.v1.Domain.Models;
using Financial.v2.Controllers.Base;
using Microsoft.AspNetCore.Mvc;

namespace Financial.v1.API.Controllers
{
    [Route("api/{version:apiVersion}/[controller]")]
    [ApiVersion("1.0")]
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
