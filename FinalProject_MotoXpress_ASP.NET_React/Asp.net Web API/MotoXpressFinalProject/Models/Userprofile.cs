using System;
using System.Collections.Generic;

namespace MotoXpressFinalProject.Models;

public partial class Userprofile
{
    public int UserId { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Address { get; set; }

    public int? CityId { get; set; }

    public string? Dlnumber { get; set; }

    public string? ProfilePhoto { get; set; }

    public string? DluploadedDocument { get; set; }

    public byte ApprovalCompleted { get; set; }

    public virtual City? City { get; set; }

    public virtual User User { get; set; } = null!;
}
