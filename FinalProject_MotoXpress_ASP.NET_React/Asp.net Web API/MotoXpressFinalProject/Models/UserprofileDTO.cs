using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MotoXpressFinalProject.Models;

public partial class UserprofileDTO
{
    [Required(ErrorMessage = "UserId is required")]
    public int UserId { get; set; }

    [Required(ErrorMessage = "PhoneNumber is required")]
    [RegularExpression(@"^[6789]\d{9}$", ErrorMessage = "Phone number must start with 6, 7, 8, or 9 and be 10 digits long.")]
    public string PhoneNumber { get; set; } = null!;

    [Required(ErrorMessage = "Address is required")]
    public string Address { get; set; } = null!;

    [Required(ErrorMessage = "CityId is required")]
    public int CityId { get; set; }

    [Required(ErrorMessage = "DLNumber is required")]
    public string Dlnumber { get; set; } = null!;

    public string ProfilePhoto { get; set; }

    [Required(ErrorMessage = "Dl Document is required")]
    public string? DluploadedDocument { get; set; }

    [Range(0, 1, ErrorMessage = "ApprovalCompleted must be 0 or 1")]
    public byte ApprovalCompleted { get; set; }
}
