using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entity;

namespace API.Data
{
    public class DBIntializier
    {
        public static async Task IntializeAsync(ProjectContext context)
        {
            if (!context.Technologies.Any())
            {
                var technologies = new Technology[]
                {
                    new Technology { Name = "C#" },
                    new Technology { Name = "ASP.NET Core" },
                    new Technology { Name = "Entity Framework" },
                    new Technology { Name = "React" },
                    new Technology { Name = "TypeScript" },
                    new Technology { Name = "JavaScript" },
                    new Technology { Name = "Angular" },
                    new Technology { Name = "Java" },
                    new Technology { Name = "SQL" },
                    new Technology { Name = "Docker" }
                };

                context.Technologies.AddRange(technologies);
                await context.SaveChangesAsync();
            }
        }
    }
}