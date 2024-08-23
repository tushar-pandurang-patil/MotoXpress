using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MotoXpressFinalProject.Models;

public partial class Bike
{
    public int BikeId { get; set; }

    public string BikeName { get; set; } = null!;

    public string BikeNumber { get; set; } = null!;

    public string? BikeDescription { get; set; }

    public decimal PerDayRental { get; set; }

    public string BikePhoto { get; set; } = null!;

    public int? AvailableCityId { get; set; }

    public byte IsAvailable { get; set; }
    [JsonIgnore]
    public virtual City? AvailableCity { get; set; }

    [JsonIgnore]
    public virtual ICollection<Rentalrecord> Rentalrecords { get; set; } = new List<Rentalrecord>();
}
