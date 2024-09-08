using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class UpdateProjectDto
    {
        public IFormFile File { get; set; }
        [Required]
        public string Name {get;set;}
        [Required]
        public string Description {get;set;}
        [Required]
        public string Link{get;set;}
        [Required]
        public List<string> Technologies { get; set;}
    }
}