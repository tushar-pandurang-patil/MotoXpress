using System;
using System.Collections.Generic;

namespace MotoXpressFinalProject.Models;

public partial class Rentalrecord
{
    public int RentalRecordId { get; set; }

    public int BikeId { get; set; }

    public int UserId { get; set; }

    public int PickupCityId { get; set; }

    public int DropOffCityId { get; set; }

    public DateTime RentalStartDate { get; set; }

    public DateTime RentalEndDate { get; set; }

    public DateTime BookingDate { get; set; }

    public byte ExtraHelmet { get; set; }

    public byte PaymentConfirmation { get; set; }

    public virtual Bike Bike { get; set; } = null!;

    public virtual City DropOffCity { get; set; } = null!;

    public virtual City PickupCity { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
