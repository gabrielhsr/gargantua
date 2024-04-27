using Gargantua.Infrastructure.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.DependencyInjection;

namespace Gargantua.Data
{
    public static class Migration
    {
        public static void RunMigration(this WebApplication app)
        {
            using var serviceScope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope();
            using var context = serviceScope.ServiceProvider.GetService<GargantuaDbContext>();

            context?.Database.Migrate();
        }
    }
}
