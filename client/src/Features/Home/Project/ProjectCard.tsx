import { Project } from '../../../app/models/project';
interface Props {
    project: Project;
  }
export default function ProjectCard({project}:Props) {
    const handleClick = () => {
        if (project.link) {
          window.open(project.link, '_blank', 'noopener,noreferrer');
        }
      };
  return (
    <div 
      onClick={handleClick}
      className="relative backdrop-blur-md h-full bg-black rounded-md p-6 shadow-lg border border-neutral-500 overflow-hidden cursor-pointer transition-all hover:border-white"
    >
        {project.pictureUrl && (
        <img 
          src={project.pictureUrl} 
          alt={project.name} 
          className="w-full h-60 object-cover rounded-md mb-4"
        />
      )}
       <h2 className="text-2xl font-bold mb-2 text-white">{project.name}</h2>
       <p className="text-gray-300 mb-4">{project.description}</p>

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-white">Technologies:</h3>
          <div className="flex flex-wrap" style={{ gap: '0.5rem' }}>
            {[...Array(Math.ceil(project.technologies.length / 4))].map((_, rowIndex) => (
              <div key={rowIndex} className="flex gap-2 w-full">
                {project.technologies.slice(rowIndex * 4, rowIndex * 4 + 4).map((tech, index) => (
                  <span
                    key={index}
                    className="inline-block bg-neutral-800 text-white text-xs sm:text-sm font-semibold rounded-full px-3 sm:px-4 py-2 whitespace-nowrap min-w-[80px] text-center"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ))}
           </div>
        </div>
    </div>
  )
}
