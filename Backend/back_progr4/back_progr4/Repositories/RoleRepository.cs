using back_progr4.Config;
using back_progr4.Models.Role;

namespace back_progr4.Repositories
{
    public interface IRoleRepository : IRepository<Role> { }
    public class RoleRepository : Repository<Role>, IRoleRepository
    {
        private readonly AplicationDbContext _db;

        public RoleRepository(AplicationDbContext db) : base(db)
        {
            _db = db;
        }
    }
}
