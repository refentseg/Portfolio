using System.Text;
using API.Data;
using API.Entity;
using API.Services;
using DotNetAPI.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });
    var jwtSecurityScheme = new OpenApiSecurityScheme
    {
        BearerFormat = "JWT",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = JwtBearerDefaults.AuthenticationScheme,
        Description ="Bearer + Token",
        Reference = new OpenApiReference
        {
            Id = JwtBearerDefaults.AuthenticationScheme,
            Type = ReferenceType.SecurityScheme
        }
        
    };
    c.AddSecurityDefinition(jwtSecurityScheme.Reference.Id,jwtSecurityScheme);
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            jwtSecurityScheme,Array.Empty<string>()
        }
    });
});

builder.Services.AddCors((options)=>{
    options.AddPolicy("DevCors",(corsBuilder)=>{
        //Where Framework can call requests React,Angular etc.
        corsBuilder.WithOrigins("http://localhost:4200","http://localhost:3000","http://localhost:8000","http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });

    options.AddPolicy("ProdCors",(corsBuilder)=>{
        //domain where front-end is at
        corsBuilder.WithOrigins("https://refentsegaonnwe.co.za","https://test.refentsegaonnwe.co.za")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddIdentityCore<User>()
    .AddRoles<Role>()
    .AddEntityFrameworkStores<ProjectContext>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>{
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer =false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey =true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["AppSettings:tokenKey"]!))
        };
    });
builder.Services.AddAuthorization();

builder.Services.AddScoped<ImageService>();
builder.Services.AddScoped<AuthHelper>();

builder.Services.AddDbContext<ProjectContext>(opt =>{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseCors("DevCors");
    app.UseSwagger();
    app.UseSwaggerUI();
}else{
    app.UseCors("ProdCors");
    app.UseHttpsRedirection();

}


// app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapFallbackToController("Index","Fallback");

using var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<ProjectContext>();
var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

try
{
    await context.Database.MigrateAsync();
    await DBIntializier.IntializeAsync(context,userManager);
}
catch (Exception ex)
{
    
    logger.LogError(ex,"Problem migrating data");
}

app.Run();
