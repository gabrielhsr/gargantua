using Financial.Data.DTO;
using Financial.Data.Models;

namespace Financial.Interfaces.Services
{
    public interface IAuthenticationService
    {
        AuthenticatedResponse ValidateProfile(Login login);
    }
}
