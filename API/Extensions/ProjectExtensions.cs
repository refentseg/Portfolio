using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Entity;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ProjectExtensions
    {
         public static IQueryable<ProjectDTO> ProjectProjectToProjectDto(this IQueryable<Project> query)
        {
            return query
                  .Select(project => new ProjectDTO
                  {
                    Id = project.Id,
                    PictureUrl = project.PictureUrl,
                    Name = project.Name,
                    Description = project.Description,
                    Link = project.Link,
                    Technologies = project.Technologies.Select(t => t.Name).ToList()
                  }).AsNoTracking();
                  

        }

        public static IQueryable<Project> Sort(this IQueryable<Project> query,string orderBy)
        {
            if(string.IsNullOrWhiteSpace(orderBy)) return query.OrderBy(i =>i.Id);//Alphabetical method
            query = orderBy switch
            {
                "name" => query.OrderBy(p=>p.Name),
                "nameDesc" =>query.OrderByDescending(p=>p.Name),
                
                _ => query.OrderBy(i=>i.Id)
            };
            return query;
        }
        public static IQueryable<Project> Search(this IQueryable<Project> query, string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm)) return query;

            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where(i=>
            i.Name.ToLower().Contains(lowerCaseSearchTerm) ||
            i.Description.ToLower().Contains(lowerCaseSearchTerm)
            );
        }
    }
}