using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entity
{
    public class Project
    {
        public Guid Id {get;set;}

        public string PictureUrl{get;set;} = "";

        public string Name {get;set;} = "";

        public string Description {get;set;} = "";

        public string Link{get;set;} = "";

        public List<Technology> Technologies { get; set; } = new List<Technology>();

        public string PublicId {get;set;} ="";

    }
}