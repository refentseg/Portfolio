import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Store/configureStore";
import { fetchProjectsAsync, projectSelectors, setPageNumber } from "./projectsSlice";
import ProjectList from "./ProjectList";
import ProjectSearch from "./ProjectSearch";
import Pagination from "../../../components/Pagination";

export default function ProjectSection() {
  const projects = useAppSelector(projectSelectors.selectAll);
  const { projectsLoaded,metaData } =
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
      <ProjectSearch />
      <div>
         <ProjectList projects={projects}/>
      </div>
      <div>
        {metaData &&
        <Pagination
        metaData={metaData}
        onPageChange={(page:number)=>dispatch(setPageNumber({pageNumber: page}))} />
        }
      </div>
    </div>
  )
}
