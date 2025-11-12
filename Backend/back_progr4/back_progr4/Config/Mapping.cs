using AutoMapper;
using back_progr4.Models.User.DTOs;
using back_progr4.Models.User;
using back_progr4.Models.Reserva;
using back_progr4.Models.Reserva.DTOs;
using back_progr4.Models.Turno;
using back_progr4.Models.Turno.DTOs;
using back_progr4.Models.Turno.DTOs.back_progr4.Models.Turno.DTOs;

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
            CreateMap<Reserva, CreateReservaDTO>();
            CreateMap<UpdateReservaDTO, Reserva>().ReverseMap();



            //Turnos
            CreateMap<Turno, TurnoDTO>().ReverseMap();
            CreateMap<CreateTurnoDTO, Turno>()
            .ForMember(
                dest => dest.Fecha, // El destino en la entidad Turno
                opt => opt.MapFrom(src => src.DateTime.Date) // La fuente es la propiedad DateTime del DTO. Usamos .Date para asegurarnos de guardar solo la fecha.
            )
            .ForMember(
                dest => dest.CupoMax, // El destino en la entidad Turno
                opt => opt.MapFrom(src => src.Capacidad) // La fuente es la propiedad Capacidad del DTO
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
