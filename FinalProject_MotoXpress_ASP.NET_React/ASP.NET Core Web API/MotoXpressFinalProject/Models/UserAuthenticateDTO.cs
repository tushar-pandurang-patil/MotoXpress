using System.ComponentModel.DataAnnotations;

namespace FinalProject.Models
{
    public class UserAuthenticateDTO
    {
        [Required(ErrorMessage = "EmailId is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string EmailId { get; set; } = null!;

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; } = null!;
    }
}
