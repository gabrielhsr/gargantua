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
        public async Task<IList<Period>> GetPeriods()
        {
            return await service.GetPeriods();
        }

        [HttpGet("expensesByPeriod")]
        public async Task<IList<Expense>> GetExpensesByPeriod(int month, int year)
        {
            return await service.GetExpensesByPeriod(new Period { Month = month, Year = year });
        }

        [HttpPost("markAsPaid")]
        public async Task<IActionResult> MarkAsPaid([FromBody] IList<Guid> ids)
        {
            await service.MarkAsPaid(ids);

            return Ok();
        }
    }
}
