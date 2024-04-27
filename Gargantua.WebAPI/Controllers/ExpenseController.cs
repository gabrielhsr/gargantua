using Financial.Controllers.Base;
using Gargantua.Domain.Interfaces.Services;
using Gargantua.Domain.Entities;
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
