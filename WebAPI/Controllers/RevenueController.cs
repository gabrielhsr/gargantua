using Financial.Data.DTO;
using Financial.Data.Models;
using Financial.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Financial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RevenueController : BaseController<Revenue>
    {
        private readonly IRevenueService service;

        public RevenueController(IRevenueService service) : base(service)
        {
            this.service = service;
        }

        [HttpGet("periods")]
        public async Task<IList<Period>> GetPeriods()
        {
            return await service.GetPeriods();
        }

        [HttpGet("revenueByPeriod")]
        public async Task<IList<Revenue>> GetRevenueByPeriod(int month, int year)
        {
            return await service.GetRevenueByPeriod(new Period { Month = month, Year = year });
        }
    }
}
