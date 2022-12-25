using Financial.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Financial.Interfaces.Repositories;

namespace Financial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentMethodController : BaseController<PaymentMethod>
    {
        public PaymentMethodController(IBaseRepository<PaymentMethod> repository) : base(repository)
        {
        }
    }
}
