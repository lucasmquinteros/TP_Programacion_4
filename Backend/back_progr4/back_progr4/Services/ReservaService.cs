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

        public ReservaService(AplicationDbContext db, IMapper mapper)
        {
            _mapper = mapper;
            _db = db;
        }

        public async Task<ReservaDTO> GetOneById(int id)
        {
            var reserva = await _db.Reservas.FirstOrDefaultAsync(x => x.Id == id);
            if (reserva == null)
            {
                throw new HttpResponseError(System.Net.HttpStatusCode.NotFound, "No se encontro o no existe la reserva");
            }
            return _mapper.Map<ReservaDTO>(reserva);
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
        public async Task CreateOne()
        {

        }

    }
}
