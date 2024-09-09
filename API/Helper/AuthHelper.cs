using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Entity;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace DotNetAPI.Helpers
{
    public class AuthHelper
    {
        private readonly IConfiguration _config;
        private readonly UserManager<User> _userManager;
        public AuthHelper(IConfiguration config,UserManager<User> userManager)
        {
            _config = config;
            _userManager = userManager;
        }
        public byte[] GetPasswordHash(string password, byte[] passwordSalt)
        {
            string passwordSaltPlusString = _config["AppSetting:PasswordKey"] +
                Convert.ToBase64String(passwordSalt);
            return KeyDerivation.Pbkdf2(
                password: password,
                salt: Encoding.ASCII.GetBytes(passwordSaltPlusString),
                prf:KeyDerivationPrf.HMACSHA256,
                iterationCount:999998,
                numBytesRequested: 512 /8
            );
        }

        public async Task<string> CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>{
                new Claim("userId",user.UserId.ToString()),
                new Claim(ClaimTypes.Email,user.Email!),
            };

            var roles = await _userManager.GetRolesAsync(user);

            foreach(var role in roles){
                claims.Add(new Claim(ClaimTypes.Role,role));
            }

            string tokenKeyString = _config["AppSettings:TokenKey"];
           
     
            SymmetricSecurityKey tokenKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    tokenKeyString != null ? tokenKeyString : ""
                )
            );

            SigningCredentials credentials = new SigningCredentials(tokenKey,SecurityAlgorithms.HmacSha512Signature);

            SecurityTokenDescriptor descriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                SigningCredentials = credentials,
                Expires = DateTime.Now.AddDays(1)
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

            SecurityToken token = tokenHandler.CreateToken(descriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}