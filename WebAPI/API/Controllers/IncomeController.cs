using Financial.Domain.DTO;
using Financial.Domain.Interfaces.Services;
using Financial.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace Financial.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IncomeController : BaseController<Income>
    {
        private readonly IIncomeService service;

        public IncomeController(IIncomeService service) : base(service)
        {
            this.service = service;
        }

        [HttpGet("periods")]
        public async Task<IList<Period>> GetPeriods()
        {
            return await service.GetPeriods();
        }

        [HttpGet("incomeByPeriod")]
        public async Task<IList<Income>> GetIncomeByPeriod(int month, int year)
        {
            return await service.GetIncomeByPeriod(new Period { Month = month, Year = year });
        }
    }
}
