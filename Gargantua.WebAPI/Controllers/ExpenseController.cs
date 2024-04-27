using Gargantua.Domain.Entities;
using Gargantua.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Gargantua.Controllers
{
    [Route("api/[controller]")]
    public class ExpenseController : BaseController<Expense>
    {
        public ExpenseController(IExpenseService service) : base(service)
        {
        }
    }
}
