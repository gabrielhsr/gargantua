using Financial.Data.DTO;
using Financial.Data.Models;
using Financial.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Authentication;

namespace Financial.Controllers
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
        public IActionResult SignIn([FromBody] Login login) 
        {
            if (login is null || login.Email is null || login.Password is null)
            {
                return BadRequest();
            }

            try
            {
                var result = authenticationService.ValidateProfile(login);

                return Ok(result);
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

        [HttpPost("signUp")]
        public IActionResult Register([FromBody] Login dto)
        {
            authenticationService.Register(dto);

            return Ok();
        }
    }
}
