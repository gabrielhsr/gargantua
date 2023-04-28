using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Financial.Domain.Interfaces.Services.Base;
using Financial.Domain.Data;
using Financial.Core.Repositories;
using Financial.Core.Services.Base;
using Financial.Core.Services;
using Financial.Domain.Interfaces.Repositories;
using Financial.Domain.Interfaces.Services;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DbConnectionString");

// Cors
var origins = builder.Configuration.GetSection("AllowedOrigins").Value!.Split(",");

builder.Services.AddCors(opts => {
    opts.AddDefaultPolicy(policy => policy.WithOrigins(origins).AllowAnyHeader().AllowAnyMethod());
});

// Database
builder.Services.AddDbContext<FinancialDbContext>(opts =>
{
    opts.UseLazyLoadingProxies().UseSqlServer(connectionString);
});

// HttpContext
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

// Repositories
builder.Services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));

// DI Aggregator
builder.Services.AddScoped(typeof(IDependencyAggregate<>), typeof(DependencyAggregate<>));

// Services
builder.Services.AddScoped(typeof(IBaseService<>), typeof(BaseService<>));
builder.Services.AddScoped<IExpenseService, ExpenseService>();
builder.Services.AddScoped<IIncomeService, IncomeService>();
builder.Services.AddScoped<IPeriodService, PeriodService>();
builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration.GetSection("ValidIssuer").Value,
            ValidAudience = builder.Configuration.GetSection("ValidAudience").Value,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("IssuerSigningKey").Value!))
        };
    });

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddRazorPages();

var app = builder.Build();

Migration.Run(app);

app.UseCors();

app.UseSwagger();
app.UseSwaggerUI();

app.UseStaticFiles();
app.UseDefaultFiles();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.MapRazorPages();

app.MapControllers();

app.Run();
