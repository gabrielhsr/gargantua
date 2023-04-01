using Financial.Data;
using Financial.Data.DTO;
using Financial.Data.Models;
using Financial.Helpers;
using Financial.Interfaces.Repositories;
using Financial.Interfaces.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Authentication;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Financial.Services
{
    public class AuthenticationService: BaseService<User>, IAuthenticationService
    {
        private readonly FinancialDbContext context;
        private readonly TokenHelper tokenHelper;
        private readonly string pepper;
        private readonly int iteration = 5;

        public AuthenticationService(IBaseRepository<User> repository, IConfiguration configuration, FinancialDbContext context) : base(repository)
        {
            var validIssuer = configuration.GetSection("ValidIssuer").Value;
            var validAudience = configuration.GetSection("ValidAudience").Value;
            var tokenSecretKey = configuration.GetSection("IssuerSigningKey").Value;

            tokenHelper = new TokenHelper(validIssuer, validAudience, tokenSecretKey);

            this.pepper = configuration.GetSection("Pepper").Value;
            this.context = context;
        }

        public async Task<AuthRes> LoginAsync(Login user)
        {
            var storedUser = await context.User.FirstOrDefaultAsync(x => x.Email.Equals(user.Email));

            if (storedUser is not null)
            {
                var passwordHash = PasswordHelper.ComputeHash(user.Password, storedUser.PasswordSalt, pepper, iteration);

                if (passwordHash == storedUser.PasswordHash)
                {
                    return new AuthRes { Token = tokenHelper.GenerateToken() };
                }
            }

            throw new AuthenticationException();
        }

        public bool ValidateToken(string token)
        {
            return tokenHelper.ValidateToken(token);
        }

        private async Task Register()
        {
            var user = new User
            {
                Email = "",
                PasswordSalt = PasswordHelper.GenerateSalt()
            };

            user.PasswordHash = PasswordHelper.ComputeHash("", user.PasswordSalt, pepper, iteration);

            await context.AddAsync(user);
            await context.SaveChangesAsync();
        }
    }
}
