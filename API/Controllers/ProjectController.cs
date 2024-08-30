using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Entity;
using API.Extensions;
using API.RequestHelpers;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    
    public class ProjectController : BaseApiController
    {
        private readonly ProjectContext _context;
        private readonly ImageService _imageService;

        public ProjectController(ProjectContext context,ImageService imageService)
        {
            _context = context;
            _imageService = imageService;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<ProjectDTO>>> GetProjects([FromQuery]ProjectParams projectParams)
        {
             var query = _context.Projects
                .Sort(projectParams.OrderBy)
                .Search(projectParams.SearchTerm)
                .AsQueryable();

            var projects = await PagedList<ProjectDTO>.ToPagedList(query.ProjectProjectToProjectDto(),projectParams.PageNumber,projectParams.PageSize);
            Response.AddPaginationHeader(projects.MetaData);

            return projects;
        }

        [HttpGet("{id}",Name ="GetProject")]
        public async Task<ActionResult<ProjectDTO>> GetProject(int id)
        {
            return await _context.Projects
                .ProjectProjectToProjectDto()
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync();

        }

        [HttpPost]
        public async Task<ActionResult<ProjectDTO>> CreateProject([FromForm] CreateProjectDto createProjectDto)
        {
            var project = new Project
            {
                Name = createProjectDto.Name,
                Description = createProjectDto.Description,
                Link = createProjectDto.Link
            };

            if (createProjectDto.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(createProjectDto.File);
                if (imageResult.Error != null)
                    return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });
                project.PictureUrl = imageResult.SecureUrl.ToString();
                project.PublicId = imageResult.PublicId;
            }


            foreach (var techName in createProjectDto.Technologies)
            {
                var technology = await _context.Technologies
                    .FirstOrDefaultAsync(t => t.Name.ToLower() == techName.ToLower());

                if (technology == null)
                {
                    technology = new Technology { Name = techName };
                    _context.Technologies.Add(technology);
                }

                project.Technologies.Add(technology);
            }

            _context.Projects.Add(project);
            var result = await _context.SaveChangesAsync()>0;

            var projectDto = new ProjectDTO
            {
                Id = project.Id,
                PictureUrl = project.PictureUrl,
                Name = project.Name,
                Description = project.Description,
                Link = project.Link,
                Technologies = project.Technologies.Select(t => t.Name).ToList()
            };

            if(result) return CreatedAtAction(nameof(GetProject), new { id = project.Id }, projectDto);
            return BadRequest(new ProblemDetails{Title = "Problem creating new product"});
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(int id, [FromForm] UpdateProjectDto updateProjectDto)
        {
            var project = await _context.Projects
                .Include(p => p.Technologies)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (project == null)
            {
                return NotFound();
            }

            //Updating image if there is one on cloudinary or keeps the old one if empty
            if(updateProjectDto.File !=null)
            {
                var imageResult = await _imageService.AddImageAsync(updateProjectDto.File);

                if(imageResult.Error !=null) 
                  return BadRequest(new ProblemDetails{Title = imageResult.Error.Message});

                if(!string.IsNullOrEmpty(project.PublicId)) 
                    await _imageService.DeleteImageAsync(project.PublicId);

                project.PictureUrl = imageResult.SecureUrl.ToString();
                project.PublicId = imageResult.PublicId;
            }

            project.Name = updateProjectDto.Name;
            project.Description = updateProjectDto.Description;
            project.Link = updateProjectDto.Link;

            project.Technologies.Clear();
            foreach (var techName in updateProjectDto.Technologies)
            {
                var technology = await _context.Technologies
                    .FirstOrDefaultAsync(t => t.Name.ToLower() == techName.ToLower());
                if (technology == null)
                {
                    technology = new Technology { Name = techName };
                    _context.Technologies.Add(technology);
                }
                project.Technologies.Add(technology);
            }

            

            var projectDto = new ProjectDTO
            {
                Id = project.Id,
                PictureUrl = project.PictureUrl,
                Name = project.Name,
                Description = project.Description,
                Link = project.Link,
                Technologies = project.Technologies.Select(t => t.Name).ToList()
            };

            
            var result = await _context.SaveChangesAsync()>0;

            if(result) return Ok(projectDto);
            return BadRequest(new ProblemDetails{Title="Problem updating project"});
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            //Find Project
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            //Have to remove it on cloudinary
            if(!string.IsNullOrEmpty(project.PublicId)) {
                await _imageService.DeleteImageAsync(project.PublicId);
            }
            _context.Projects.Remove(project);
            var result = await _context.SaveChangesAsync()>0;

            if(result) return Ok();
            return BadRequest(new ProblemDetails{Title="Problem deleting project"});
        }
    }
}