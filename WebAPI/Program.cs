using Microsoft.EntityFrameworkCore;
using Financial.Data;
using Financial.Repositories;
using Financial.Interfaces.Repositories;
using Financial.Services;
using Financial.Interfaces.Services;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DbConnectionString");

// Cors
var origins = builder.Configuration.GetSection("AllowedOrigins").Value.Split(",");

builder.Services.AddCors(opts => {
    opts.AddDefaultPolicy(policy => policy.WithOrigins(origins).AllowAnyHeader().AllowAnyMethod());
});

// Database
builder.Services.AddDbContext<FinancialDbContext>(opts =>
{
    opts.UseLazyLoadingProxies()
        .UseSqlServer(connectionString);
});

// Repositories
builder.Services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));

// Services
builder.Services.AddScoped(typeof(IBaseService<>), typeof(BaseService<>));
builder.Services.AddScoped<IExpenseService, ExpenseService>();
builder.Services.AddScoped<IIncomeService, IncomeService>();
builder.Services.AddScoped<IPeriodService, PeriodService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

UpdateDatabase(app);

app.UseSwagger();
app.UseSwaggerUI();

app.UseStaticFiles();
app.UseDefaultFiles();

app.UseAuthorization();
app.UseCors();

app.UseHttpsRedirection();

app.MapControllers();

app.Run();

static void UpdateDatabase(WebApplication app)
{
    using var serviceScope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope();
    using var context = serviceScope.ServiceProvider.GetService<FinancialDbContext>();

    context?.Database.Migrate();
}