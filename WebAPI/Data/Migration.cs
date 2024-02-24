using Microsoft.EntityFrameworkCore;

namespace Financial.Data
{
    public static class Migration
    {
        public static void RunMigration(this WebApplication app)
        {
            using var serviceScope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope();
            using var context = serviceScope.ServiceProvider.GetService<FinancialDbContext>();

            context?.Database.Migrate();
        }
    }
}
