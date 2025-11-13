using Auth.Utils;
using AutoMapper;
using back_progr4.Config;
using back_progr4.Models.Turno;
using back_progr4.Models.Turno.DTOs;
using back_progr4.Models.Turno.DTOs.back_progr4.Models.Turno.DTOs;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace back_progr4.Services
{
        public class TurnoService
        {
            private readonly AplicationDbContext _db;
            private readonly IMapper _mapper;

            public TurnoService(AplicationDbContext db, IMapper mapper)
            {
                _mapper = mapper;
                _db = db;
            }

            public async Task<Turno> GetOneById(int id)
            {
                var turno = await _db.Turnos.FirstOrDefaultAsync(x => x.Id == id);
                if (turno == null)
                {
                    throw new HttpResponseError(System.Net.HttpStatusCode.NotFound, "No se encontro o no existe el turno");
                }
                return turno;
            }

            public async Task<List<TurnoDTO>> GetTurnosByDay(DateTime dia)
            {
                var turnos = await _db.Turnos.Where(T => T.Fecha.Date == dia.Date).ToListAsync();
                List<TurnoDTO> turnosDTO = _mapper.Map<List<TurnoDTO>>(turnos);
                return turnosDTO;
            }

            public async Task<List<TurnoDTO>> GetAll()
            {
                var turnos = await _db.Turnos.ToListAsync();
                return _mapper.Map<List<TurnoDTO>>(turnos);
            }
            public async Task ActualizarCupos(int id, int cantidadARestar)
            {
                var turno = await GetOneById(id);
                if (turno.CuposDisponibles >= cantidadARestar)
                {
                    turno.CuposDisponibles -= cantidadARestar;
                    _db.Turnos.Update(turno);
                }
                else
                {
                    throw new HttpResponseError(System.Net.HttpStatusCode.BadRequest, "No hay cupos disponibles para este turno");
                }
            }

            public async Task<TurnoDTO> CreateOne(CreateTurnoDTO createTurno)
            {
                try
            {
                var turno = _mapper.Map<Turno>(createTurno);

                await _db.Turnos.AddAsync(turno);
                await _db.SaveChangesAsync();

                return _mapper.Map<TurnoDTO>(turno);
            }
                catch (Exception ex)
                {
                throw new HttpResponseError(System.Net.HttpStatusCode.InternalServerError, "Error al crear el turno: " + ex.Message);
                }
            }

            public async Task<TurnoDTO> UpdateOne(int id, UpdateTurnoDTO updateTurno)
            {
                var turno = await GetOneById(id);

                Turno turnoMappeado = _mapper.Map(updateTurno, turno);

                _db.Turnos.Update(turnoMappeado);
                await _db.SaveChangesAsync();

                return _mapper.Map<TurnoDTO>(turnoMappeado);
            }

            public async Task DeleteOne(int id)
            {
                var turno = await GetOneById(id);
                _db.Turnos.Remove(turno);
                await _db.SaveChangesAsync();
            }
        }
    }

