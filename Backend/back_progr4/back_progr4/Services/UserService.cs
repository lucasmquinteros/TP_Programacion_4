using Auth.Utils;
using AutoMapper;
using back_progr4.Models.Role;
using back_progr4.Models.User.DTOs;
using back_progr4.Models.User;
using System.Net;
using back_progr4.Repositories;
using back_progr4.ENUMS;
using Microsoft.EntityFrameworkCore;

namespace back_progr4.Services
{
    public class UserServices
    {
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;
        private readonly IEncoderServices _encoderServices;
        private readonly RoleServices _roleServices;

        public UserServices(IUserRepository repo, IMapper mapper, IEncoderServices encoderServices, RoleServices roleServices)
        {
            _repo = repo;
            _mapper = mapper;
            _encoderServices = encoderServices;
            _roleServices = roleServices;
        }
        public async Task<User> GetOneById(int id)
        {
            var user = await _repo.GetOneAsync(x => x.Id == id);
            if (user == null)
            {
                throw new HttpResponseError(HttpStatusCode.NotFound, "User not found");
            }
            return user;
        }

        async public Task<List<UserWithoutPassDTO>> GetAll()
        {
            var users = await _repo.GetAllAsync(
                null,
                q => q.Include(u => u.Roles).Include(u => u.Reservas)
                );
            return _mapper.Map<List<UserWithoutPassDTO>>(users);
        }

        async public Task<User> GetOneByEmailOrUsername(string? email, string? username)
        {
            if (string.IsNullOrEmpty(username) && string.IsNullOrEmpty(email))
            {
                throw new HttpResponseError(HttpStatusCode.BadRequest, "Email and Username are empty");
            }

            var user = await _repo.GetOneAsync(
                x => x.Email == email || x.UserName == username,
                q => q.Include(u => u.Reservas)
                      .Include(u => u.Roles)
            );
            return user;
        }

        async public Task<UserWithoutPassDTO> CreateOne(RegisterDTO register)
        {
            var user = _mapper.Map<User>(register);

            user.Password = _encoderServices.Encode(user.Password);

            var role = await _roleServices.GetOneByName(ROLE.USER);
            user.Roles = new() { role };

            await _repo.CreateOneAsync(user);

            return _mapper.Map<UserWithoutPassDTO>(user);
        }
    }
}
