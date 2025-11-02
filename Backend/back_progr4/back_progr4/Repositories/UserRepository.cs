using back_progr4.Config;
using back_progr4.Models.User;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Linq;

namespace back_progr4.Repositories
{
    public interface IUserRepository : IRepository<User> { }
    public class UserRepository : Repository<User>, IUserRepository
    {
        private readonly AplicationDbContext _db;

        public UserRepository(AplicationDbContext db) : base(db)
        {
            _db = db;
        }

        new async public Task<User> GetOneAsync(Expression<Func<User, bool>>? filter = null)
        {
            IQueryable<User> query = dbSet;
            if (filter != null)
            {
                query = query.Where(filter).Include(x => x.Roles);
            }
            return await query.FirstOrDefaultAsync();
        }
    }
}
