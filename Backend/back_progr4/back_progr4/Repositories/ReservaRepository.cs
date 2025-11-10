using back_progr4.Config;
using back_progr4.Models.Reserva;

namespace back_progr4.Repositories
{
    public interface IReservaRepository : IRepository<Reserva> { }
    public class ReservaRepository : Repository<Reserva>, IReservaRepository
    {
        private readonly AplicationDbContext _db;

        public ReservaRepository(AplicationDbContext db) : base(db) {
            _db = db;
        }
    }
}
