using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace API.Entity
{
    public partial class User: IdentityUser<int>
    {
        public int UserId {get;set;}
        public string FirstName {get;set;} = "";
        public string LastName {get;set;}   ="";
    }
}