using Financial.Domain.Interfaces.Providers;

namespace Financial.Core.Providers
{
    public class UserProvider : IUserProvider
    {
        private readonly IHttpContextAccessor acessor;

        public UserProvider(IHttpContextAccessor context)
        {
            acessor = context ?? throw new ArgumentNullException(nameof(context));
        }

        public Guid GetIdUser()
        {
            var id = acessor.HttpContext.User.Claims.FirstOrDefault(x => x.Type == "Id")?.Value;
            var parsed = Guid.TryParse(id, out Guid parsedId);

            if (!parsed)
            {
                throw new InvalidDataException("User Id cannot be parsed!");
            }

            return parsedId;
        }
    }
}
