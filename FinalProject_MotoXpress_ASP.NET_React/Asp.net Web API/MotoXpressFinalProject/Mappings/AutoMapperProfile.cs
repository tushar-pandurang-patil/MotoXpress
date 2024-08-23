using AutoMapper;
using FinalProject.Models;
using MotoXpressFinalProject.Models;

namespace FinalProjectMotoXpress.Mappings
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<User, UserAuthenticateDTO>().ReverseMap();
            CreateMap<Userprofile, UserprofileDTO>().ReverseMap();
            CreateMap<Bike, BikeDTO>().ReverseMap();
            CreateMap<City, CityDTO>().ReverseMap();
            CreateMap<Rentalrecord, RentalrecordDTO>().ReverseMap();
        }
    }
}
