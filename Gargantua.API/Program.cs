using Gargantua.Core.Repositories;
using Gargantua.Data;
using Gargantua.Domain.Interfaces.Repositories;
using Gargantua.Domain.Interfaces.Services;
using Gargantua.Domain.Interfaces.Services.Base;
using Gargantua.Helpers;
using Gargantua.Infrastructure.Data;
using Gargantua.Middlewares;
using Gargantua.Service.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.OData;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using Newtonsoft.Json;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;
var connectionString = configuration.GetConnectionString("DbConnectionString");
var services = builder.Services;

// Cors
var origins = configuration.GetSection("AllowedOrigins").Value.Split(",");

services.AddCors(opts =>
{
    opts.AddDefaultPolicy(policy => policy.WithOrigins(origins).AllowAnyHeader().AllowAnyMethod());
});

// Database
services.AddDbContext<GargantuaDbContext>(opts =>
{
    opts.UseLazyLoadingProxies()
        .UseSqlServer(connectionString)
        .EnableDetailedErrors()
        .EnableSensitiveDataLogging();
});

// Repositories
services.AddScoped(typeof(IBaseRepository<,>), typeof(BaseRepository<,>));

// DI Aggregator
services.AddScoped(typeof(IDependencyAggregate<,>), typeof(DependencyAggregate<,>));

// Services
services.AddScoped(typeof(IBaseService<,>), typeof(BaseService<,>));

// Authentication
var daConfig = builder.Configuration.GetSection("DownstreamApi");

services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddMicrosoftIdentityWebApi(configuration, "AzureAd")
    .EnableTokenAcquisitionToCallDownstreamApi()
    .AddDownstreamApi("DownstreamApi", daConfig)
    .AddInMemoryTokenCaches();

// Routes
services
    .AddControllers()
    .AddOData(options =>
    {
        options
            .OrderBy()
            .Filter()
            .Count()
            .Expand()
            .Select()
            .SetMaxTop(100)
            .AddRouteComponents("odata", OdataHelper.GetEdmModel());
    })
    .AddNewtonsoftJson(options =>
    {
        options.UseMemberCasing();
        options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
        options.SerializerSettings.DateFormatString = "yyyy'-'MM'-'dd'T'HH':'mm':'ss.FFFFFFFK";
    });

services.AddEndpointsApiExplorer();
services.AddRazorPages();
services.AddSwaggerGen(options =>
{
    options.ResolveConflictingActions(x => x.First());
});

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

app.UseMiddleware<ODataResponseMiddleware>();

app.MapControllers();

app.UseODataRouteDebug();
app.UseODataQueryRequest();

app.UseDeveloperExceptionPage();

app.Run();