using Microsoft.EntityFrameworkCore;

namespace Financial.Data
{
    public static class Migration
    {
        public static void Run(WebApplication app)
        {
            using var serviceScope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope();
            using var context = serviceScope.ServiceProvider.GetService<FinancialDbContext>();

            context?.Database.Migrate();
        }
    }
}
