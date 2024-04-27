using Gargantua.Domain.Entities;
using Gargantua.Domain.Interfaces.Services.Base;

namespace Gargantua.Domain.Interfaces.Services
{
    public interface IAuthenticationService : IBaseService<User>
    {
        Task<Authorization> LoginAsync(Login user);
        bool ValidateToken(string token);
        Task RegisterAsync(Login user);
    }
}
