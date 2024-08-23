using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MotoXpressFinalProject.Models;

public partial class RentalrecordDTO
{
    [Required(ErrorMessage = "BikeId is required")]
    public int BikeId { get; set; }

    [Required(ErrorMessage = "UserId is required")]
    public int UserId { get; set; }

    [Required(ErrorMessage = "PickupCityId is required")]
    public int PickupCityId { get; set; }

    [Required(ErrorMessage = "DropOffCityId is required")]
    public int DropOffCityId { get; set; }

    [Required(ErrorMessage = "RentalStartDate is required")]
    [DataType(DataType.Date)]
    public DateTime RentalStartDate { get; set; }

    [Required(ErrorMessage = "RentalEndDate is required")]
    [DataType(DataType.Date)]
    [DateGreaterThan(nameof(RentalStartDate), ErrorMessage = "RentalEndDate must be greater than RentalStartDate")]
    public DateTime RentalEndDate { get; set; }

    [Required(ErrorMessage = "BookingDate is required")]
    [DataType(DataType.Date)]
    public DateTime BookingDate { get; set; }

    public byte ExtraHelmet { get; set; }

    [Range(0, 1, ErrorMessage = "PaymentConfirmation must be 0 or 1")]
    public byte PaymentConfirmation { get; set; }

    // Custom validation attribute
    public class DateGreaterThanAttribute : ValidationAttribute
    {
        private readonly string _comparisonProperty;

        public DateGreaterThanAttribute(string comparisonProperty)
        {
            _comparisonProperty = comparisonProperty;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var currentValue = (DateTime)value;

            var property = validationContext.ObjectType.GetProperty(_comparisonProperty);

            if (property == null)
                throw new ArgumentException("Property with this name not found");

            var comparisonValue = (DateTime)property.GetValue(validationContext.ObjectInstance);

            if (currentValue <= comparisonValue)
                return new ValidationResult(ErrorMessage);

            return ValidationResult.Success;
        }
    }
}
