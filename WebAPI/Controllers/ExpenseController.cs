using Financial.Controllers.Base;
using Financial.Domain.Interfaces.Services;
using Financial.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace Financial.Controllers
{
    [Route("api/[controller]")]
    public class ExpenseController : BaseController<Expense>
    {
        public ExpenseController(IExpenseService service) : base(service)
        {
        }
    }
}
