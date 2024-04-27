using Gargantua.Domain.Entities;
using Gargantua.Domain.Interfaces.Services.Base;
using Microsoft.AspNetCore.Mvc;

namespace Gargantua.Controllers
{
    [Route("api/[controller]")]
    public class PaymentMethodController : BaseController<PaymentMethod>
    {
        public PaymentMethodController(IBaseService<PaymentMethod> service) : base(service)
        {
        }
    }
}
