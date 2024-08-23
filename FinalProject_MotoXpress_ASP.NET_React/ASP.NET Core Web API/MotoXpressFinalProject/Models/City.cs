using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MotoXpressFinalProject.Models;

public partial class City
{
    public int CityId { get; set; }

    public string CityName { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<Bike> Bikes { get; set; } = new List<Bike>();
    [JsonIgnore]
    public virtual ICollection<Rentalrecord> RentalrecordDropOffCities { get; set; } = new List<Rentalrecord>();
    [JsonIgnore]
    public virtual ICollection<Rentalrecord> RentalrecordPickupCities { get; set; } = new List<Rentalrecord>();
    [JsonIgnore]
    public virtual ICollection<Userprofile> Userprofiles { get; set; } = new List<Userprofile>();
}
