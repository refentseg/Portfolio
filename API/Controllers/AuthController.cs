using System;
using System.Security.Cryptography;
using API.Data;
using API.DTO;
using API.Entity;
using DotNetAPI.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AuthController : BaseApiController
    {
         private readonly AuthHelper _authHelper;
         private readonly ProjectContext _context;

         private readonly UserManager<User> _userManager;
        public AuthController(IConfiguration config,ProjectContext context,UserManager<User> userManager)
        {
             _authHelper = new AuthHelper(config,userManager);
             _context = context;
             _userManager = userManager;
        }

        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<IActionResult> Register(UserForRegistrationDto registrationDto)
        {
            // if (await _userManager.Users.AnyAsync())
            // {
            //     return BadRequest("Registration is no longer available.");
            // }
            if (registrationDto.Password != registrationDto.PasswordConfirm)
            {
                return BadRequest("Passwords do not Match");
            }

            var existingUser = await _userManager.FindByEmailAsync(registrationDto.Email);
            if (existingUser != null)
            {
                return BadRequest("User already exists");
            }

            byte[] passwordSalt = new byte[128 / 8];
            using (RandomNumberGenerator rng = RandomNumberGenerator.Create())
            {
                rng.GetNonZeroBytes(passwordSalt);
            }

            byte[] passwordHash = _authHelper.GetPasswordHash(registrationDto.Password, passwordSalt);

            var auth = new Auth
            {
                Email = registrationDto.Email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };

            _context.Auth.Add(auth);

            var user = new User
            {
                FirstName = registrationDto.FirstName,
                LastName = registrationDto.LastName,
                Email = registrationDto.Email,
                UserName = registrationDto.Email 
            };

            var result = await _userManager.CreateAsync(user); // Use CreateAsync without password

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            
            await _userManager.AddToRoleAsync(user,"Admin");

            await _context.SaveChangesAsync();

            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<IActionResult> Login(UserForLoginDto loginDto)
        {
            var auth = await _context.Auth
                .Where(a => a.Email == loginDto.Email)
                .FirstOrDefaultAsync();

            if (auth == null)
            {
                return Unauthorized("Invalid Email");
            }

            byte[] passwordHash = _authHelper.GetPasswordHash(loginDto.Password, auth.PasswordSalt);

            if (!passwordHash.SequenceEqual(auth.PasswordHash))
            {
                return Unauthorized("Incorrect Password");
            }

            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null)
            {
                return Unauthorized("User not found");
            }

            string token = await _authHelper.CreateToken(user);

            return Ok(new Dictionary<string, string> { { "token",token } });
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);            

            return new UserDto
            {
                Email = user.Email,
                Token = await  _authHelper.CreateToken(user)
            };
        }

        

    }
}