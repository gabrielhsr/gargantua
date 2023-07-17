using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Financial.v2.Data;
using Financial.v2.Core.Repositories.Base;
using Financial.v2.Domain.Interfaces.Repositories.Base;
using Financial.v2.Domain.Interfaces.Services.Base;
using Financial.v2.Core.Services.Base;
using Microsoft.AspNetCore.Mvc;
using Financial.v2.Domain.Interfaces.Services;
using Financial.v2.Core.Services;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DbConnectionString");
var services = builder.Services;

// Cors
var origins = builder.Configuration.GetSection("AllowedOrigins").Value!.Split(",");

services.AddCors(opts => {
    opts.AddDefaultPolicy(policy => policy.WithOrigins(origins).AllowAnyHeader().AllowAnyMethod());
});

// Database
services.AddDbContext<FinancialDbContext>(opts =>
{
    opts.UseLazyLoadingProxies().UseSqlServer(connectionString);
});

// HttpContext
services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

// Repositories
services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));

// DI Aggregator
services.AddScoped(typeof(IDependencyAggregate<>), typeof(DependencyAggregate<>));

// Services
services.AddScoped(typeof(IBaseService<>), typeof(BaseService<>));

services.AddScoped<IAuthenticationService, AuthenticationService>();

services.AddAuthentication(options =>
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

services
    .AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.DateFormatString = "yyyy'-'MM'-'dd'T'HH':'mm':'ss.FFFFFFFK";
    });

services.AddApiVersioning(setup =>
{
    setup.DefaultApiVersion = ApiVersion.Default;
    setup.AssumeDefaultVersionWhenUnspecified = true;
    setup.ReportApiVersions = true;
});

services.AddEndpointsApiExplorer();
services.AddSwaggerGen();
services.AddRazorPages();

var app = builder.Build();

app.RunMigration();

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

