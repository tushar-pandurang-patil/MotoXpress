using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MotoXpressFinalProject.Models;

public partial class User
{
    public int UserId { get; set; }

    public string UserFullName { get; set; } = null!;

    public string EmailId { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? Role { get; set; }
    [JsonIgnore]
    public virtual ICollection<Rentalrecord> Rentalrecords { get; set; } = new List<Rentalrecord>();

    public virtual Userprofile? Userprofile { get; set; }
}
