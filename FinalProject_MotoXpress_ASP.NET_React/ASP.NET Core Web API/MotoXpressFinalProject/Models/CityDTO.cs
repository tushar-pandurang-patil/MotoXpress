using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace MotoXpressFinalProject.Models;

public partial class CityDTO
{
    public int CityId { get; set; }
    [Required(ErrorMessage = "City Name is required")]
    [StringLength(20, ErrorMessage = "City Name cannot be longer than 20 characters")]
    public string CityName { get; set; } = null!;

}
