
import { useEffect } from "react";
import { fetchProjectsAsync, projectSelectors } from "../../Features/Home/Project/projectsSlice";
import { useAppSelector, useAppDispatch } from "../Store/configureStore";

export default function UseProjects(){
const projects = useAppSelector(projectSelectors.selectAll);
  const { projectsLoaded, metaData } =
    useAppSelector((state) => state.projects);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!projectsLoaded) dispatch(fetchProjectsAsync());
  }, [projectsLoaded, dispatch]);

 return{
    projects,
    projectsLoaded,
    metaData
 }

}