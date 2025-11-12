using Auth.Utils;
using AutoMapper;
using back_progr4.Config;
using back_progr4.Models.Reserva;
using back_progr4.Models.Reserva.DTOs;
using back_progr4.Models.User;
using Microsoft.EntityFrameworkCore;

namespace back_progr4.Services
{
    public class ReservaService
    {
        private readonly AplicationDbContext _db;
        private readonly IMapper _mapper;

        public ReservaService(AplicationDbContext db, IMapper mapper)
        {
            _mapper = mapper;
            _db = db;
        }

        public async Task<Reserva> GetOneById(int id)
        {
            var reserva = await _db.Reservas.FirstOrDefaultAsync(x => x.Id == id);
            if (reserva == null)
            {
                throw new HttpResponseError(System.Net.HttpStatusCode.NotFound, "No se encontro o no existe la reserva");
            }
            return reserva;
        }
        public async Task<List<ReservaDTO>> GetAllByUserID(int userId)
        {
            var reservasUsuario = await _db.Reservas
                .Where(r => r.UserId == userId)
                .Include(r => r.Turno)
                .Include(r => r.User)
                .OrderByDescending(r => r.FechaReserva) 
                .ToListAsync();

            var reservasDto = _mapper.Map<List<ReservaDTO>>(reservasUsuario);
            return reservasDto;
        }
        public async Task<List<ReservaDTO>> GetAllToday()
        {
            var todayUtc = DateTime.UtcNow.Date;
            var tomorrowUtc = todayUtc.AddDays(1);

            var reservasHoy = await _db.Reservas
                .Where(r => r.FechaReserva >= todayUtc && r.FechaReserva < tomorrowUtc)
                .Include(r => r.Turno)  
                .Include(r => r.User)
                .ToListAsync();

            var reservasDto = _mapper.Map<List<ReservaDTO>>(reservasHoy);

            return reservasDto;
        }
        public async Task<List<ReservaDTO>> GetAllByDay(DateTime date)
        {
            var reservas = await _db.Reservas.Where(r => r.FechaReserva.Date == date.Date).ToListAsync();
            return _mapper.Map<List<ReservaDTO>>(reservas);
        }
        public async Task<ReservaDTO> CreateOne(CreateReservaDTO createReserva)
        {
            var reserva = _mapper.Map<Reserva>(createReserva);

            await _db.Reservas.AddAsync(reserva);
            await _db.SaveChangesAsync();

            return _mapper.Map<ReservaDTO>(reserva);

        }
        public async Task<ReservaDTO> UpdateOne(int id , UpdateReservaDTO updateReserva)
        {
            var reserva = await GetOneById(id);
            
            Reserva reservaMappeada = _mapper.Map(updateReserva, reserva);
            
            _db.Reservas.Update(reservaMappeada);
            await _db.SaveChangesAsync();

            return _mapper.Map<ReservaDTO>(reservaMappeada);

        }
        public async Task DeleteOne(int id)
        {
            var reserva = await GetOneById(id);
            _db.Reservas.Remove(reserva);
            await _db.SaveChangesAsync();
        }

    }
}
