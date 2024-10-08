﻿using Gargantua.Domain.Entities;
using Gargantua.Domain.Interfaces.Services.Base;
using Microsoft.AspNetCore.Mvc;

namespace Gargantua.Controllers
{
    [Route("api/[controller]")]
    public class PaymentMethodController : BaseController<PaymentMethod, Guid>
    {
        public PaymentMethodController(IBaseService<PaymentMethod, Guid> service) : base(service)
        {
        }
    }
}
