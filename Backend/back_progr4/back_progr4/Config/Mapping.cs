using AutoMapper;
using back_progr4.Models.User.DTOs;
using back_progr4.Models.User;
using back_progr4.Models.Reserva;
using back_progr4.Models.Reserva.DTOs;

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

            // Auth
            CreateMap<RegisterDTO, User>();

            CreateMap<User, UserWithoutPassDTO>().ForMember(
                dest => dest.Roles,
                opt => opt.MapFrom(e => e.Roles.Select(x => x.Name).ToList())
            ).ReverseMap();
        }
    }
}
