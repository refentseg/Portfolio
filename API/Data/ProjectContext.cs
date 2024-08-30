using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ProjectContext:DbContext
    {
        public ProjectContext(DbContextOptions options) :base(options)
       {
        
       }

       public DbSet<Project> Projects{get;set;}
       public DbSet<Technology> Technologies{get;set;}


       protected override void OnModelCreating(ModelBuilder builder)
       {
         base.OnModelCreating(builder);

         builder.Entity<Project>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.PictureUrl).HasMaxLength(255);
            entity.Property(e => e.Link).HasMaxLength(255);
        });

        builder.Entity<Technology>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(50);
            entity.HasIndex(e => e.Name).IsUnique();
        });

         builder.Entity<Project>()
                .HasMany(p => p.Technologies)
                .WithMany();

         


       }
    }
}