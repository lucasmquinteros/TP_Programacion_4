using back_progr4.Config;
using back_progr4.Models.Turno;

namespace back_progr4.Repositories
{
    public interface ITurnoRepository : IRepository<Turno> { }
    public class TurnoRepository : Repository<Turno>, ITurnoRepository
    {
        private readonly AplicationDbContext _db;

        public TurnoRepository(AplicationDbContext db) : base(db)
        {
            _db = db;
        }
    }
}
