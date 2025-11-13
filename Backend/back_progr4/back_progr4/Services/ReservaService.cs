using Auth.Utils;
using AutoMapper;
using back_progr4.Config;
using back_progr4.Models.Reserva;
using back_progr4.Models.Reserva.DTOs;
using Microsoft.EntityFrameworkCore;

namespace back_progr4.Services
{
    public class ReservaService
    {
        private readonly AplicationDbContext _db;
        private readonly IMapper _mapper;
        private readonly TurnoService _turnoService;
        private readonly UserServices _userServices;

        public ReservaService(AplicationDbContext db, IMapper mapper, TurnoService turnoService, UserServices userServices)
        {
            _mapper = mapper;
            _db = db;
            _turnoService = turnoService;
            _userServices = userServices;
        }
        public async Task<List<ReservaDTO>> GetReservasByUser(int userId)
        {
            var user = await _userServices.GetOneById(userId);
            var reservas = await _db.Reservas
                .Where(r => r.UserId == user.Id)
                .Include(r => r.Turno) 
                .ToListAsync();
            return _mapper.Map<List<ReservaDTO>>(reservas);
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
            try
            {

            var turnoExiste = await _db.Turnos.AnyAsync(t => t.Id == createReserva.TurnoId);
            if (!turnoExiste)
            {
                throw new HttpResponseError(System.Net.HttpStatusCode.NotFound,
                    $"El TurnoId {createReserva.TurnoId} no existe.");
            }

            var userExiste = await _db.Users.AnyAsync(u => u.Id == createReserva.UserId); 
            if (!userExiste)
            {
                throw new HttpResponseError(System.Net.HttpStatusCode.NotFound,
                    $"El UserId {createReserva.UserId} no existe.");
            }


            var reserva = _mapper.Map<Reserva>(createReserva);

            await _turnoService.ActualizarCupos(createReserva.TurnoId, createReserva.Cantidad);

            await _db.Reservas.AddAsync(reserva);
            await _db.SaveChangesAsync(); 
            return _mapper.Map<ReservaDTO>(reserva);
            } catch (Exception ex)
            {
                throw; // new HttpResponseError(System.Net.HttpStatusCode.InternalServerError, ex.Message);
            }
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
