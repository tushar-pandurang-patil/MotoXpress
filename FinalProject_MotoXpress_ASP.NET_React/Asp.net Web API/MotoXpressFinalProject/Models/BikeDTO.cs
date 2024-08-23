using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MotoXpressFinalProject.Models;

public partial class BikeDTO
{
    [Required(ErrorMessage = "Bike Name is required")]
    [StringLength(50, ErrorMessage = "Bike Name cannot be longer than 50 characters")]
    public string BikeName { get; set; } = null!;

    [Required(ErrorMessage = "Bike Number is required")]
    [StringLength(10, ErrorMessage = "Bike Registration Number cannot be longer than 10 characters")]
    public string BikeNumber { get; set; } = null!;

    public string? BikeDescription { get; set; }

    public decimal PerDayRental { get; set; }

    [Required(ErrorMessage = "Bike Photo is required")]
    public string BikePhoto { get; set; } = null!;

    public int? AvailableCityId { get; set; }

    public string? CityName { get; set; }

    public byte IsAvailable { get; set; }

 }
