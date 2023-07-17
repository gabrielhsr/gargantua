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
    public class IncomeController : BaseController<Income>
    {
        private readonly IIncomeService service;

        public IncomeController(IIncomeService service) : base(service)
        {
            this.service = service;
        }

        [HttpGet("periods")]
        public IList<Period> GetPeriods()
        {
            return service.GetPeriods();
        }

        [HttpGet("incomeByPeriod")]
        public IList<Income> GetIncomeByPeriod(int month, int year)
        {
            return service.GetIncomeByPeriod(new Period { Month = month, Year = year });
        }
    }
}
