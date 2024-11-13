import { useState } from "react";
import agent from "../../app/api/agent";
import { Project } from "../../app/models/project";
import { useAppDispatch} from "../../app/Store/configureStore";
import { removeProject } from "../Home/Project/projectsSlice";
import ProjectForm from "./Form/ProjectForm";
import { Loader2, Pencil, PlusCircle, Trash2 } from "lucide-react";
import UseProjects from "../../app/hooks/UseProjects";


export default function AdminPage() {
const {projects} = UseProjects();
const dispatch = useAppDispatch();
  const [editMode,setEditMode] = useState(false);
  const [selectedProject,setSelectedProject] = useState<Project | undefined>(undefined);
  const [target,setTarget] = useState('')
  const [loading,setLoading] = useState(false)

  function handleSelectProject(project:Project){
      setSelectedProject(project)
      setEditMode(true);
  }

  function handleDeleteProject(id:string){
      setLoading(true);
      setTarget(id)
      agent.Admin.deleteProject(id)
      .then(()=>dispatch(removeProject(id)))
      .catch(error =>console.log(error))
      .finally(() =>setLoading(false))
  
  }

  function cancelEdit(){
      if(selectedProject) setSelectedProject(undefined);
      setEditMode(false);
  }

  function handleAddProject() {
    setSelectedProject(undefined);
    setEditMode(true);
  }

  if(editMode)return <ProjectForm project={selectedProject} cancelEdit={cancelEdit} />
  return (
    <div className="container mx-auto px-4 space-y-8 mt-24 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Projects</h1>
        <button 
          onClick={handleAddProject}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300"
        >
          <PlusCircle className="mr-2 h-5 w-5" /> 
          <span className="mt-1">Add Project</span>
        </button>
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-500 text-gray-200 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Technologies</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {projects.map((project) => (
              <tr key={project.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 text-left whitespace-nowrap">{project.name}</td>
                <td className="py-3 px-6 text-left w-[800px]">{project.description}</td>
                <td className="py-3 px-6 text-left">{project.technologies.join(', ')}</td>
                <td className="py-3 px-6 text-center">
                  <div className="flex justify-center space-x-4">
                    <button 
                      onClick={() => handleSelectProject(project)}
                      className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
                    >
                    {loading && target === project.id ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Pencil className="h-5 w-5" />
                    )}
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      disabled={loading && target === project.id}
                      className={`text-red-500 hover:text-red-700 transition-colors duration-300 ${
                        loading && target === project.id ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
