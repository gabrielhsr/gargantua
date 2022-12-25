using Financial.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Financial.Interfaces.Repositories;
using Financial.Interfaces.Services;

namespace Financial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentMethodController : BaseController<PaymentMethod>
    {
        public PaymentMethodController(IBaseService<PaymentMethod> service) : base(service)
        {
        }
    }
}
