using Financial.Domain.DTO;
using Financial.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Authentication;

namespace Financial.API.Controllers
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

        [HttpPost("validateToken")]
        public IActionResult ValidateToken([FromBody] AuthRes dto)
        {
            var isValid = authenticationService.ValidateToken(dto.Token);

            return isValid ? Ok() : Unauthorized();
        }
    }
}
