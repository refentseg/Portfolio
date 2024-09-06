import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Store/configureStore";
import { setProjectParams } from "./projectsSlice";
import { debounce } from 'lodash';

export default function ProjectSearch() {
    const {projectParams} = useAppSelector(state=>state.projects);
    const [searchTerm,setSearchTerm] = useState(projectParams.searchTerm);
    const dispatch = useAppDispatch();   

    const debouncedSearch = debounce((event:any)=>{
        dispatch(setProjectParams({searchTerm:event.target.value}))
    },1000)
  return (
   <input
   placeholder="Search..."
   className="p-3 mt-4  w-1/2 mb-2 border-b border-gray-30 bg-transparent focus:outline-0 hover:border-gray-400"
   value={searchTerm || ''}
   onChange={(event:any)=>{
    setSearchTerm(event.target.value);
    debouncedSearch(event);
}} />
  )
}
