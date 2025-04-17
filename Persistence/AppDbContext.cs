using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class AppDbContext(DbContextOptions opts) : DbContext(opts)
{
    public required DbSet<Activity> Activities { get; set; }
}
