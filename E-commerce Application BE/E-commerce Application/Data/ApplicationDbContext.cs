using WebApplication1.Models;
using Microsoft.EntityFrameworkCore;

namespace WebApplication1.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
    public DbSet<Product> product { get; set; }
    public DbSet<PurchasedHistory> PurchasedHistory { get; set; }
    public DbSet<OrderedProducts> OrderedProducts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<OrderedProducts>()
            .HasKey(o => new { o.idProduct, o.idPurchasedHistory });
    }
}