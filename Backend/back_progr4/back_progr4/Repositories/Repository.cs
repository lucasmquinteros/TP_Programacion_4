using System.Collections.Generic;
using System.Linq.Expressions;
using back_progr4.Config;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace back_progr4.Repositories
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>>? filter = null,
            Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null);
        Task<T> GetOneAsync(Expression<Func<T, bool>>? filter = null,
             Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null
            );
        Task CreateOneAsync(T entity);
        Task UpdateOneAsync(T entity);
        Task DeleteOneAsync(T entity);
        Task SaveAsync();
    }
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly AplicationDbContext _db;
        internal DbSet<T> dbSet { get; set; } = null!;
        
        public Repository(AplicationDbContext db)
        {
            _db = db;
            dbSet = _db.Set<T>();
        }

        async public Task CreateOneAsync(T entity)
        {
            await dbSet.AddAsync(entity);
            await SaveAsync();
        }

        async public Task DeleteOneAsync(T entity)
        {
            dbSet.Remove(entity);
            await SaveAsync();
        }

        async public Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>>? filter = null, Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null)
        {
            IQueryable<T> query = dbSet;
            if (filter != null)
            {
                query = query.Where(filter);
            }
            if (include != null)
            {
                query = include(query);
            }
            return await query.ToListAsync();
        }

        public async Task<T> GetOneAsync(
        Expression<Func<T, bool>> predicate,
        Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null
    )
        {
            IQueryable<T> query = dbSet;

            if (include != null)
            {
                query = include(query); 
            }

            return await query.FirstOrDefaultAsync(predicate);
        }

        async public Task UpdateOneAsync(T entity)
        {
            dbSet.Update(entity);
            await SaveAsync();
        }

        async public Task SaveAsync()
        {
            await _db.SaveChangesAsync();
        }
    }
}
