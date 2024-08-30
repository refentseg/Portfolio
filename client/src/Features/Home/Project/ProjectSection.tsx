import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Store/configureStore";
import { fetchProjectsAsync, projectSelectors } from "./projectsSlice";
import ProjectList from "./ProjectList";

export default function ProjectSection() {
  const projects = useAppSelector(projectSelectors.selectAll);
  const { projectsLoaded, filtersLoaded,projectParams,metaData } =
    useAppSelector((state) => state.projects);
  const dispatch = useAppDispatch();

  //Two use Effects because it shows the project/filter twice on the redux
  useEffect(() => {
    if (!projectsLoaded) dispatch(fetchProjectsAsync());
  }, [projectsLoaded, dispatch]);


  return (
    <div id="projects" className="h-full container">
      <div className='text-3xl font-bold '><span>My Projects</span>
      <hr className='mt-2 border-neutral-400'/>
      </div>
      <div>
        {!projectsLoaded ? <p>Loading Projects ...</p> : <ProjectList projects={projects}/>}
      </div>
      
    </div>
  )
}
