using AutoMapper;
using back_progr4.Models.User.DTOs;
using back_progr4.Models.User;
using back_progr4.Models.Reserva;
using back_progr4.Models.Reserva.DTOs;
using back_progr4.Models.Turno;
using back_progr4.Models.Turno.DTOs;
using back_progr4.Models.Turno.DTOs.back_progr4.Models.Turno.DTOs;
using back_progr4.ENUMS;

namespace back_progr4.Config
{
    public class Mapping : Profile
    {
        public Mapping()
        {
            // Defaults
            CreateMap<int?, int>().ConvertUsing((src, dest) => src ?? dest);
            CreateMap<bool?, bool>().ConvertUsing((src, dest) => src ?? dest);
            CreateMap<string?, string>().ConvertUsing((src, dest) => src ?? dest);

            //Reserva
            CreateMap<Reserva, ReservaDTO>().ReverseMap();
            CreateMap<CreateReservaDTO, ReservaDTO>().ReverseMap();
            CreateMap<CreateReservaDTO, Reserva>()
                .ForMember(
                    dest => dest.FechaReserva,
                    opt => opt.MapFrom(src => DateTime.Now) // El servidor ESTABLECE la fecha
                )
                .ForMember(
                    dest => dest.Estado,
                    opt => opt.MapFrom(src => ESTADO.CONFIRMADA) // El servidor ESTABLECE el estado inicial
                );
            CreateMap<Reserva, CreateReservaDTO>();
            CreateMap<UpdateReservaDTO, Reserva>().ReverseMap();



            //Turnos
            CreateMap<Turno, TurnoDTO>().ReverseMap();
            CreateMap<CreateTurnoDTO, Turno>()
                .ForMember(
                    dest => dest.Fecha,
                    opt => opt.MapFrom(src => src.DateTime.Date)
                )
                .ForMember(
                    dest => dest.CupoMax, // El cupo máximo total
                    opt => opt.MapFrom(src => src.Capacidad)
                )
                .ForMember(
                    dest => dest.CuposDisponibles, 
                    opt => opt.MapFrom(src => src.Capacidad) // Inicializa los cupos disponibles
                ).ForMember(
                    dest => dest.Estado, 
                    opt => opt.MapFrom(src => ESTADO.DISPONIBLE) // Forzamos el valor
                );
            CreateMap<Turno, CreateTurnoDTO>();
            CreateMap<UpdateTurnoDTO, Turno>();




            // Auth
            CreateMap<RegisterDTO, User>();

            CreateMap<User, UserWithoutPassDTO>().ForMember(
                dest => dest.Roles,
                opt => opt.MapFrom(e => e.Roles.Select(x => x.Name).ToList())
            ).ReverseMap();
        }
    }
}
