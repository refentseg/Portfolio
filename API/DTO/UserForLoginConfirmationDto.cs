using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public partial class UserForLoginConfirmationDto
    {
        public byte[] PasswordHash {get;set;} = new byte[0];

        public byte[] PasswordSalt {get;set;} = new byte[0];
    }
}