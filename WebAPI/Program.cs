using Financial.Configurations;
using Financial.Data;
using Financial.Interfaces;
using Financial.Repositories;
using Microsoft.EntityFrameworkCore;

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
builder.Services.AddScoped<IExpensesRepository, ExpensesRepository>();

// Services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAutoMapper(typeof(AutoMapperConfig));

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
