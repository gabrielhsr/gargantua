using Financial.Data;
using Financial.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using Financial.Interfaces.Repositories;
using Financial.Services;
using Financial.Interfaces.Services;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DbConnectionString");

// Cors
builder.Services.AddCors(opts =>{
    opts.AddDefaultPolicy(x => x.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());
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
builder.Services.AddScoped<IRevenueService, RevenueService>();
builder.Services.AddScoped<IPeriodService, PeriodService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors();

app.MapControllers();

app.Run();
