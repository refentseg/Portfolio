import { Project } from "../../../app/models/project";
import { useAppSelector } from "../../../app/Store/configureStore";
import ProjectCard from "./ProjectCard";
import ProjectCardSkeleton from "./ProjectCardSkeleton";

interface Props {
    projects:Project[];
}

export default function ProjectList({projects}:Props){
    const {projectsLoaded} = useAppSelector(state => state.projects)
    return(
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {projects?.length === 0 ? (
        <p className="text-2xl text-gray-300">Project not found</p>
        ) : (
          projects?.map((project) => (
            <div key={project.id} className="">
              {!projectsLoaded ? (
                <ProjectCardSkeleton />
              ) : (
                <ProjectCard project={project} />
              )}
            </div>
          ))
        )}
        </div>
    )
}