using Auth.Utils;
using AutoMapper;
using back_progr4.Config;
using back_progr4.ENUMS;
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
            private int CUPO_MAXIMO_POR_TURNO = 50;

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
                    if(turno.CuposDisponibles == 0)
                    {
                       turno.Estado = ESTADO.COMPLETO;
                    }
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
        private List<TimeOnly> GenerarPlantillaDeHorarios(DateTime fecha)
        {
            var horarios = new List<TimeOnly>();
            var diaDeLaSemana = fecha.DayOfWeek;

            switch (diaDeLaSemana)
            {
                case DayOfWeek.Sunday:
                    break;

                case DayOfWeek.Saturday:
                    for (int hora = 8; hora <= 11; hora++)
                    {
                        horarios.Add(new TimeOnly(hora, 0, 0));
                    }
                    break;

                default:
                    for (int hora = 8; hora <= 17; hora++)
                    {
                        horarios.Add(new TimeOnly(hora, 0, 0));
                    }
                    break;
            }

            return horarios;
        }


        public async Task<List<DisponibilidadDTO>> GetDisponibilidad(DateTime fecha)
        {
            var fechaLimpia = fecha.Date;
            var ahora = DateTime.Now;
            var hoy = ahora.Date;
            var horaActual = TimeOnly.FromTimeSpan(ahora.TimeOfDay);

            if (fechaLimpia < hoy)
            {
                return new List<DisponibilidadDTO>();
            }


            var plantilla = GenerarPlantillaDeHorarios(fechaLimpia);

            if (!plantilla.Any())
            {
                return new List<DisponibilidadDTO>();
            }

            // existe un turno ese dia? bueno traemelo
            var turnosReales = await _db.Turnos
                .Where(t => t.Fecha == fechaLimpia)
                .ToDictionaryAsync(t => t.HoraInicio);

            var disponibilidadDelDia = new List<DisponibilidadDTO>();


            foreach (var horaInicio in plantilla)
            {
                if (fechaLimpia == hoy && horaInicio < horaActual)
                {
                    continue;
                }

                if (turnosReales.TryGetValue(horaInicio, out var turnoReal))
                {
                    // Si existe, usamos sus cupos (siempre que no esté lleno)
                    if (turnoReal.Estado != ESTADO.LLENO)
                    {
                        disponibilidadDelDia.Add(new DisponibilidadDTO
                        {
                            Fecha = fechaLimpia,
                            HoraInicio = horaInicio,
                            HoraFin = horaInicio.AddHours(1), 
                            CuposDisponibles = turnoReal.CuposDisponibles
                        });
                    }
                }
                else
                {
                    disponibilidadDelDia.Add(new DisponibilidadDTO
                    {
                        Fecha = fechaLimpia,
                        HoraInicio = horaInicio,
                        HoraFin = horaInicio.AddHours(1),
                        CuposDisponibles = CUPO_MAXIMO_POR_TURNO 
                    });
                }
            }

            return disponibilidadDelDia;
        }

        public async Task<Turno> GetOrCreateTurnoParaSlot(DateTime fecha, TimeOnly horaInicio)
        {
            var turno = await _db.Turnos
                .FirstOrDefaultAsync(t => t.Fecha == fecha.Date && t.HoraInicio == horaInicio);

            if (turno == null)
            {
                turno = new Turno
                {
                    Fecha = fecha.Date,
                    HoraInicio = horaInicio,
                    HoraFin = horaInicio.AddHours(1),
                    CupoMax = CUPO_MAXIMO_POR_TURNO,
                    CuposDisponibles = CUPO_MAXIMO_POR_TURNO, 
                    Estado = ESTADO.DISPONIBLE
                };

                await _db.Turnos.AddAsync(turno);
            }

            return turno;
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

