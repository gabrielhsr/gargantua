using Gargantua.Domain.Entities;
using Gargantua.Domain.Interfaces.Services;
using Gargantua.Infrastructure.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Security.Authentication;

namespace Gargantua.Service.Services
{
    public class AuthenticationService : BaseService<User, Guid>, IAuthenticationService
    {
        private readonly TokenHelper tokenHelper;
        private readonly string pepper;
        private readonly int iteration = 5;

        public AuthenticationService(IDependencyAggregate<User, Guid> aggregate, IConfiguration configuration) : base(aggregate)
        {
            var validIssuer = configuration.GetSection("ValidIssuer").Value;
            var validAudience = configuration.GetSection("ValidAudience").Value;
            var tokenSecretKey = configuration.GetSection("IssuerSigningKey").Value;

            tokenHelper = new TokenHelper(validIssuer, validAudience, tokenSecretKey);

            pepper = configuration.GetSection("Pepper").Value;
        }

        public async Task<Authorization> LoginAsync(Login user)
        {
            var userDbSet = repository.Context.Set<User>();
            var storedUser = await userDbSet.FirstOrDefaultAsync(x => x.Email.Equals(user.Email));

            if (storedUser is not null)
            {
                var passwordHash = PasswordHelper.ComputeHash(user.Password, storedUser.PasswordSalt, pepper, iteration);

                if (passwordHash == storedUser.PasswordHash)
                {
                    return new Authorization { Token = tokenHelper.GenerateToken(storedUser) };
                }
            }

            throw new AuthenticationException();
        }

        public bool ValidateToken(string token)
        {
            return tokenHelper.ValidateToken(token);
        }

        public async Task RegisterAsync(Login login)
        {
            var user = new User
            {
                Email = login.Email,
                PasswordSalt = PasswordHelper.GenerateSalt()
            };

            user.PasswordHash = PasswordHelper.ComputeHash(login.Password, user.PasswordSalt, pepper, iteration);

            await repository.Context.AddAsync(user);
            await repository.Context.SaveChangesAsync();
        }
    }
}
