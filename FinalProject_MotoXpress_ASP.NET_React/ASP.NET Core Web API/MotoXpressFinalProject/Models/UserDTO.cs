using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MotoXpressFinalProject.Models;

public partial class UserDTO
{
    [Required(ErrorMessage = "Name is required")]
    [StringLength(30, ErrorMessage = "Name length can't be more than 30.")]
    public string UserFullName { get; set; } = null!;

    [Required(ErrorMessage = "EmailId is required")]
    [EmailAddress(ErrorMessage = "Invalid Email Address")]
    public string EmailId { get; set; } = null!;

    [Required(ErrorMessage = "Password is required")]
    [RegularExpression(@"^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$",
            ErrorMessage = "Password must be at least 8 characters long and contain at least one uppercase letter, one special character, and one digit.")]
    public string Password { get; set; } = null!;

    public string Role { get; set; }

}
