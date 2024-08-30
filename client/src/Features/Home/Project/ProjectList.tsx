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
        {projects?.map((project) => (
            <div className="">
            {! projectsLoaded ? (
              <ProjectCardSkeleton />
            ):(
              <ProjectCard key={project.id} project={project}/>
            )}
            </div>
        ))}
        </div>
    )
}