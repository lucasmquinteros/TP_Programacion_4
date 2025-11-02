using back_progr4.Models.Role;
using back_progr4.Models.User;
using Microsoft.EntityFrameworkCore;

namespace back_progr4.Config
{
    public class AplicationDbContext : DbContext
    {
        public AplicationDbContext(DbContextOptions<AplicationDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasIndex(x => x.UserName).IsUnique();
            modelBuilder.Entity<User>().HasIndex(x => x.Email).IsUnique();
            modelBuilder.Entity<Role>().HasIndex(x => x.Name).IsUnique();

            modelBuilder.Entity<User>()
                .HasMany(x => x.Roles)
                .WithMany()
                .UsingEntity<UserRoles>(
                    l => l.HasOne<Role>().WithMany().HasForeignKey(x => x.RoleId),
                    r => r.HasOne<User>().WithMany().HasForeignKey(x => x.UserId)
                );
        }
    }
}
