using Gargantua.Domain.Entities;
using Gargantua.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Authentication;

namespace Gargantua.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            this.authenticationService = authenticationService;
        }

        [HttpPost("signIn")]
        public async Task<IActionResult> SignIn([FromBody] Login user)
        {
            try
            {
                return Ok(await authenticationService.LoginAsync(user));
            }
            catch (AuthenticationException)
            {
                return Unauthorized();
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Login user)
        {
            try
            {
                await authenticationService.RegisterAsync(user);
                return Ok();
            }
            catch (AuthenticationException)
            {
                return Unauthorized();
            }
        }

        [HttpPost("validateToken")]
        public IActionResult ValidateToken([FromBody] Authorization dto)
        {
            var isValid = authenticationService.ValidateToken(dto.Token);

            return isValid ? Ok(true) : Unauthorized();
        }
    }
}
