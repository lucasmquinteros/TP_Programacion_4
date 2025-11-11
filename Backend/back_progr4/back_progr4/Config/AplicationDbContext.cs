using back_progr4.ENUMS;
using back_progr4.Models.Reserva;
using back_progr4.Models.Role;
using back_progr4.Models.Turno;
using back_progr4.Models.User;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace back_progr4.Config
{
    public class AplicationDbContext : DbContext
    {
        public AplicationDbContext(DbContextOptions<AplicationDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }

        // <-- Agregados
        public DbSet<Turno> Turnos { get; set; }
        public DbSet<Reserva> Reservas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Unicidades básicas
            modelBuilder.Entity<User>().HasIndex(x => x.UserName).IsUnique();
            modelBuilder.Entity<User>().HasIndex(x => x.Email).IsUnique();
            modelBuilder.Entity<Role>().HasIndex(x => x.Name).IsUnique();

            // Relación Turno -> Reservas (1 Turno : N Reservas)
            modelBuilder.Entity<Turno>()
                .HasMany(t => t.Reservas)
                .WithOne(r => r.Turno)
                .HasForeignKey(r => r.TurnoId)
                .OnDelete(DeleteBehavior.Restrict); 

            // Relación User -> Reservas (1 User : N Reservas)
            modelBuilder.Entity<User>()
                .HasMany(u => u.Reservas)
                .WithOne(r => r.User)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Reserva>()
                .HasIndex(r => new { r.UserId, r.TurnoId })
                .IsUnique();

            modelBuilder.Entity<Turno>()
                .HasIndex(t => new { t.Fecha, t.HoraInicio })
                .IsUnique();

            // Validaciones / límites
            modelBuilder.Entity<Reserva>()
                .Property(r => r.Cantidad)
                .IsRequired();

            modelBuilder.Entity<Reserva>()
                .Property(r => r.FechaReserva);

            modelBuilder.Entity<Turno>()
                .Property(t => t.Estado)
                .IsRequired()
                .HasMaxLength(30);

      
            modelBuilder.Entity<User>()
                .HasMany(x => x.Roles)
                .WithMany()
                .UsingEntity<UserRoles>(
                    l => l.HasOne<Role>().WithMany().HasForeignKey(x => x.RoleId),
                    r => r.HasOne<User>().WithMany().HasForeignKey(x => x.UserId)
                );


            // seed de roles
            modelBuilder.Entity<Role>().HasData(
                new Role { Id = 1, Name = ROLE.USER },
                new Role { Id = 2, Name = ROLE.ADMIN }
            );

            //seed de usuarios: base.OnModelCreating(modelBuilder);

            // Hash de ejemplo (contraseña: 123456)
            var password = "123456";
            using var sha = SHA256.Create();
            var hashedPassword = Convert.ToBase64String(sha.ComputeHash(Encoding.UTF8.GetBytes(password)));

            // Usuario normal
            var user1 = new User
            {
                Id = 1,
                UserName = "Juan Pérez",
                Email = "juan@example.com",
                Password = hashedPassword,
                Roles = new List<Role>
                {
                    new Role { Id = 1, Name = ROLE.USER }
                }
            };

            // Usuario admin
            var admin = new User
            {
                Id = 2,
                UserName = "Admin",
                Email = "admin@parque.com",
                Password = hashedPassword,
                Roles = new List<Role>{
                    new Role { Id = 1, Name = ROLE.USER }
                }
            };

            // Turno de hoy (id 1) — necesario para la reserva
            var turnoHoy = new Turno
            {
                Id = 1,
                Fecha = DateTime.UtcNow.Date,
                HoraInicio = new TimeOnly(15, 0, 0),
                HoraFin = new TimeOnly(16, 0, 0),
                CupoMax = 50,
                Estado = "Abierto"
            };

            // Reserva de ejemplo
            var reserva = new Reserva
            {
                Id = 1,
                UserId = 1,
                TurnoId = 1,
                FechaReserva = DateTime.UtcNow,
                Cantidad = 2,
                Estado = "Activa"
            };


            modelBuilder.Entity<User>().HasData(user1, admin);
            modelBuilder.Entity<Turno>().HasData(turnoHoy);
            modelBuilder.Entity<Reserva>().HasData(reserva);


            //Turnos : 
            var turnos = new List<Turno>
{
                new Turno
                {
                    Id = 2,
                    Fecha = DateTime.UtcNow.Date.AddDays(-1),
                    HoraInicio = new TimeOnly(14, 0, 0),
                    HoraFin = new TimeOnly(15, 0, 0),
                    CupoMax = 50,
                    Estado = "Cerrado"
                },
                new Turno
                {
                    Id = 3,
                    Fecha = DateTime.UtcNow.Date.AddDays(1),
                    HoraInicio = new TimeOnly(17, 0, 0),
                    HoraFin = new TimeOnly(18, 0, 0),
                    CupoMax = 50,
                    Estado = "Abierto"
                },
                new Turno
                {
                    Id = 4,
                    Fecha = DateTime.UtcNow.Date.AddDays(2),
                    HoraInicio = new TimeOnly(15, 0, 0),
                    HoraFin = new TimeOnly(16, 0, 0),
                    CupoMax = 50,
                    Estado = "Abierto"
                }
            };
            modelBuilder.Entity<Turno>().HasData(turnos);
        }
    }
}
