using Financial.Controllers.Base;
using Gargantua.Domain.Interfaces.Services.Base;
using Gargantua.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Financial.Controllers
{
    [Route("api/[controller]")]
    public class PaymentMethodController : BaseController<PaymentMethod>
    {
        public PaymentMethodController(IBaseService<PaymentMethod> service) : base(service)
        {
        }
    }
}
