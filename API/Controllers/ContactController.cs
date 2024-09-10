using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ContactController:BaseApiController
    {
        private readonly IContactFormEmailSender _emailSender;

        public ContactController(IContactFormEmailSender emailSender)
        {
            _emailSender = emailSender;
        }

        [HttpPost("submit")]
        public async Task<IActionResult> SubmitForm([FromBody] ContactFormDto formData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            bool emailSent = await _emailSender.SendContactFormEmail(formData);

            if (emailSent)
            {
                return Ok(new { message = "Your message has been sent successfully." });
            }
            else
            {
                return StatusCode(500, new { message = "An error occurred while sending your message. Please try again later." });
            }
        }
    }
}