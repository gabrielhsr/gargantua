using Financial.Data;
using Financial.Data.DTO;
using Financial.Data.Models;
using Financial.Interfaces.Repositories;
using Financial.Interfaces.Services;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Authentication;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Financial.Services
{
    public class AuthenticationService: BaseService<Login>, IAuthenticationService
    {
        private readonly string? validIssuer;
        private readonly string? validAudience;
        private readonly SymmetricSecurityKey secretKey;

        public AuthenticationService(IBaseRepository<Login> repository, IConfiguration configuration, FinancialDbContext context): base(repository)
        {
            this.validIssuer = configuration.GetSection("ValidIssuer").Value;
            this.validAudience = configuration.GetSection("ValidAudience").Value;
            this.secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetSection("IssuerSigningKey").Value!));
        }

        public AuthRes ValidateProfile(Login login)
        {
            if (login.Email == "teste@email.com" && login.Password == "12345")
            {
                var credentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var tokenOptions = new JwtSecurityToken(
                    issuer: validIssuer,
                    audience: validAudience,
                    claims: new List<Claim>(),
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: credentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

                return new AuthRes { Token = tokenString };
            }

            throw new AuthenticationException();
        }

        public bool ValidateToken(string? token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = secretKey,
                    ValidAudience = validAudience,
                    ValidIssuer = validIssuer,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task Register(Login login)
        {
            login.Password = GenerateHash(login.Password);
            await SaveAsync(Guid.Empty, login);
        }

        private static string GenerateHash(string password)
        {
            var byteValue = Encoding.UTF8.GetBytes(password);
            var byteHash = SHA256.HashData(byteValue);
            var hash = Convert.ToBase64String(byteHash);

            return hash;
        }
    }
}
