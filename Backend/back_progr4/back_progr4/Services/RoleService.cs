using Auth.Utils;
using back_progr4.Models.Role;
using back_progr4.Repositories;
using System.Net;

namespace back_progr4.Services
{
    public class RoleServices
    {
        private readonly IRoleRepository _repo;

        public RoleServices(IRoleRepository repo)
        {
            _repo = repo;
        }

        public async Task<Role> GetOneByName(string name)
        {
            var role = await _repo.GetOneAsync(x => x.Name == name);

            if (role == null)
            {
                throw new HttpResponseError(
                    HttpStatusCode.NotFound,
                    $"Role with name '{name}' doesn't exist"
                );
            }

            return role;
        }
    }
}
