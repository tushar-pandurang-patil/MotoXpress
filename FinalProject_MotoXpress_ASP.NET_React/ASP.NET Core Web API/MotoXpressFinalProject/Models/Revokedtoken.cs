using System;
using System.Collections.Generic;

namespace MotoXpressFinalProject.Models;

public partial class Revokedtoken
{
    public int Id { get; set; }

    public string Token { get; set; } = null!;

    public DateTime RevokedAt { get; set; }
}
