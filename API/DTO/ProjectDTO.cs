using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class ProjectDTO
    {
        public Guid Id {get;set;}

        public string PictureUrl{get;set;} = "";

        public string Name {get;set;} = "";

        public string Description {get;set;} = "";

        public string Link{get;set;} = "";

        public List<string> Technologies { get; set; } = new List<string>();
    }
}