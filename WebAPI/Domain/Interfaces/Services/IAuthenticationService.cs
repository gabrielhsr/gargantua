using Financial.Domain.DTO;
using Financial.Domain.Models;
using Financial.Domain.Interfaces.Services.Base;

namespace Financial.Domain.Interfaces.Services
{
    public interface IAuthenticationService : IBaseService<User>
    {
        Task<AuthRes> LoginAsync(Login user);
        bool ValidateToken(string token);
    }
}
