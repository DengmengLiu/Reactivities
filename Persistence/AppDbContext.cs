using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class AppDbContext(DbContextOptions opts) : IdentityDbContext<User>(opts)
{
    public required DbSet<Activity> Activities { get; set; }
}
