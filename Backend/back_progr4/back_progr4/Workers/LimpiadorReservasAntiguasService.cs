using back_progr4.Config;
using back_progr4.ENUMS;
using Microsoft.EntityFrameworkCore;

namespace back_progr4.Workers
{
    public class LimpiadorReservasAntiguasService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<LimpiadorReservasAntiguasService> _logger;

        public LimpiadorReservasAntiguasService(IServiceProvider serviceProvider, ILogger<LimpiadorReservasAntiguasService> logger)
        {
            _serviceProvider = serviceProvider;
            _logger = logger;
        }

        // Este método se ejecuta cuando el servicio en segundo plano se inicia.
        /*
            Esta echo para las reservas que se quedaron viejas o que ya pasaron se guarden como completadas y no como disponibles, para que no aparezcan en las listas de reservas activas.
            Falta agregar lo mismo con los turnos, que sean completados cuando ya pasaron.YATA 
         */
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("El Limpiador de Reservas Antiguas está activo.");

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    await ActualizarReservas(stoppingToken);
                    await ActualizarTurnos(stoppingToken);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Ocurrió un error al actualizar las reservas antiguas.");
                }

                await Task.Delay(TimeSpan.FromHours(12), stoppingToken);
            }
        }
        private async Task ActualizarTurnos(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Ejecutando limpieza de turnos...");
            using (var scope = _serviceProvider.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<AplicationDbContext>();

                var ahora = DateTime.UtcNow; 
                var hoy = ahora.Date;
                var horaActual = TimeOnly.FromTimeSpan(ahora.TimeOfDay);

                
                var turnosParaCompletar = await dbContext.Turnos
                    .Where(t => t.Estado == ESTADO.DISPONIBLE || t.Estado == ESTADO.COMPLETO)
                    .Where(t =>
                           t.Fecha < hoy || 
                           (t.Fecha == hoy && t.HoraFin < horaActual) 
                    )
                    .ToListAsync(stoppingToken); 

                if (turnosParaCompletar.Any())
                {
                    _logger.LogInformation($"Se encontraron {turnosParaCompletar.Count} turnos para marcar como completados.");

                    foreach (var turno in turnosParaCompletar)
                    {
                        turno.Estado = ESTADO.FINALIZADO; 
                    }

                    await dbContext.SaveChangesAsync(stoppingToken);
                }
                else
                {
                    _logger.LogInformation("No se encontraron turnos para actualizar.");
                }
            }
        }
        private async Task ActualizarReservas(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Ejecutando limpieza de reservas...");
            using (var scope = _serviceProvider.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<AplicationDbContext>();

                var ahora = DateTime.UtcNow; 
                var hoy = ahora.Date;
                var horaActual = TimeOnly.FromTimeSpan(ahora.TimeOfDay);

                
                var reservasParaCompletar = await dbContext.Reservas
                    .Include(r => r.Turno) 
                    .Where(r => r.Estado == ESTADO.CONFIRMADA)
                    .Where(r =>
                           r.Turno.Fecha < hoy || 
                           (r.Turno.Fecha == hoy && r.Turno.HoraFin < horaActual) 
                    )
                    .ToListAsync(stoppingToken); 

                if (reservasParaCompletar.Any())
                {
                    _logger.LogInformation($"Se encontraron {reservasParaCompletar.Count} reservas para marcar como completadas.");

                    foreach (var reserva in reservasParaCompletar)
                    {
                        reserva.Estado = ESTADO.FINALIZADO; 
                    }

                    await dbContext.SaveChangesAsync(stoppingToken);
                }
                else
                {
                    _logger.LogInformation("No se encontraron reservas para actualizar.");
                }
            }
        }
    }
}
