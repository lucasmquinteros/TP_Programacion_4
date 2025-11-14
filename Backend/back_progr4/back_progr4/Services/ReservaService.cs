using Auth.Utils;
using AutoMapper;
using back_progr4.Config;
using back_progr4.ENUMS;
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
            var turnoParaLaReserva = await _turnoService.GetOrCreateTurnoParaSlot(
                createReserva.FechaTurno,
                createReserva.HoraInicioTurno
            );


            if (turnoParaLaReserva.CuposDisponibles < createReserva.Cantidad)
            {
                throw new HttpResponseError(System.Net.HttpStatusCode.BadRequest, "No hay suficientes cupos.");
            }

            turnoParaLaReserva.CuposDisponibles -= createReserva.Cantidad;
            if (turnoParaLaReserva.CuposDisponibles == 0)
            {
                turnoParaLaReserva.Estado = ESTADO.LLENO;
            }

            var reserva = _mapper.Map<Reserva>(createReserva);
            reserva.Turno = turnoParaLaReserva; 

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
            await _turnoService.ActualizarCupos(reserva.TurnoId, reserva.Cantidad * -1);
            _db.Reservas.Remove(reserva);
            await _db.SaveChangesAsync();
        }

    }
}
