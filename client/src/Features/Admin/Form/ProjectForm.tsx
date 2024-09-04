import { Controller, FieldValues, useForm } from "react-hook-form";
import { Project } from "../../../app/models/project";
import { validationSchema } from "./projectVaildation";
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from "../../../app/Store/configureStore";
import agent from "../../../app/api/agent";
import { ChangeEvent, useEffect, useState } from "react";
import { setProject } from "../../Home/Project/projectsSlice";
import CreatableSelect from 'react-select/creatable';

interface Props{
    project?:Project;
    cancelEdit:() => void;
}

const techOptions = [
  { value: '.Net', label: '.Net' },
{ value: 'React', label: 'React' },
{ value: 'Angular', label: 'Angular' },
{ value: 'TypeScript', label: 'TypeScript' },
{ value: 'Nodejs', label: 'Node.js' },
{ value: 'Nextjs', label: 'Next.js' },
{ value: 'Prisma', label: 'Prisma' },
{ value: 'HTML', label: 'HTML' },
{ value: 'CSS', label: 'CSS' },
{ value: 'PostgreSQL', label: 'PostgreSQL' },
{ value: 'Docker', label: 'Docker' },
{ value: 'CSharp', label: 'C#' },
{ value: 'JavaScript', label: 'JavaScript' },
{ value: 'Python', label: 'Python' },
{ value: 'MongoDB', label: 'MongoDB' },
{ value: 'RDS', label: 'RDS' },
{ value: 'AWS', label: 'AWS' },
{ value: 'Azure', label: 'Azure' }
]

export default function ProjectForm({project,cancelEdit}:Props) {
    const [imagePreview, setImagePreview] = useState('');
    const { control,reset,handleSubmit,watch,formState:{isDirty,isSubmitting,errors} } = useForm({
        resolver:zodResolver(validationSchema)
    });
    const watchFile = watch('file',null)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(project && !watchFile && !isDirty) reset(project)
        return ()=>{
            if(watchFile) URL.revokeObjectURL(watchFile.preview)
        }
    },[project,reset,watchFile,isDirty])

    async function handleSubmitData(data:FieldValues){
        try{
            let response :Project;
            if(project){
                response= await agent.Admin.updateProject(data);
            }
            else{
                response = await agent.Admin.createProject(data);
            }
            dispatch(setProject(response));
            cancelEdit(); //leaves the form
        }catch(error:any)
        {
            console.log(error)
        }
    }
    const handleFileChange = (event:ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          // Create a preview URL and set it to the state
          const previewUrl = URL.createObjectURL(file);
          setImagePreview(previewUrl);
        } else {
          // Clear the preview URL if no file is selected
          setImagePreview('');
        }
      };
  return (
    <form onSubmit={handleSubmit(handleSubmitData)} className="h-full max-w-2xl mx-auto bg-neutral-900 p-8 rounded-lg shadow-xl mt-24 mb-40 ">
    <h2 className="text-3xl font-bold mb-6 text-gray-200">
      {project ? 'Edit Project' : 'Create Project'}
    </h2>

    {imagePreview && (
      <div className="mb-6">
        <img src={imagePreview} alt="Image preview" className="w-60 h-60 object-cover mx-auto rounded-lg border-2 border-neutral-700" />
      </div>
    )}

    <div className="mb-6">
      <label htmlFor="file" className="block text-sm font-medium text-gray-300 mb-2">Image</label>
      <Controller
        name="file"
        control={control}
        render={({ field: { value, onChange, ...field } }) => (
          <input
            {...field}
            id="file"
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-300
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-600 file:text-white
              hover:file:bg-blue-700
              file:cursor-pointer"
          />
        )}
      />
      {errors.file && <p className="mt-2 text-sm text-red-500">{errors.file.message as string}</p>}
    </div>

    <div className="mb-6">
      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            id="name"
            className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
      />
      {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name.message as string}</p>}
    </div>

    <div className="mb-6">
      <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">Description</label>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <textarea
            {...field}
            id="description"
            rows={4}
            className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
      />
      {errors.description && <p className="mt-2 text-sm text-red-500">{errors.description.message as string}</p>}
    </div>

    <div className="mb-6">
      <label htmlFor="link" className="block text-sm font-medium text-gray-300 mb-2">Link</label>
      <Controller
        name="link"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            id="link"
            type="url"
            className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
      />
      {errors.link && <p className="mt-2 text-sm text-red-500">{errors.link.message as string}</p>}
    </div>

    <div className="mb-6">
      <label htmlFor="technologies" className="block text-sm font-medium text-gray-300 mb-2">Technologies</label>
      <Controller
        name="technologies"
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <CreatableSelect
            {...field}
            isClearable
            isMulti
            options={techOptions}
            value={value ? value.map((v:string) => ({ value: v, label: v })) : []}
            onChange={(newValue) => onChange(newValue.map((item) => item.value))}
            className="react-select-container"
            classNamePrefix="react-select"
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: '#262626',
                borderColor: '#404040',
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: '#262626',
                maxHeight: '200px',  // Set the maximum height of the dropdown
                overflowY: 'auto', 
              }),
              menuList: (base) => ({
                ...base,
                maxHeight: 'none',   // Remove any height restriction
                overflowY: 'visible', // Disable scrolling for this element
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? '#404040' : '#262626',
                color: 'white',
              }),
              multiValue: (base) => ({
                ...base,
                backgroundColor: '#404040',
              }),
              multiValueLabel: (base) => ({
                ...base,
                color: 'white',
              }),
              multiValueRemove: (base) => ({
                ...base,
                color: 'white',
                ':hover': {
                  backgroundColor: '#FF4136',
                  color: 'white',
                },
              }),
              input: (base) => ({
                ...base,
                color: 'white',  // This changes the input text color to white
              }),
              dropdownIndicator: (base) => ({
                ...base,
                color: 'white',
                '&:hover': {
                  color: 'grey', 
                },
              })
            }}
          />
        )}
      />
      {errors.technologies && <p className="mt-2 text-sm text-red-500">{errors.technologies.message as string}</p>}
    </div>

    <div className="flex justify-end space-x-4">
      <button
        type="button"
        onClick={cancelEdit}
        className="px-4 py-2 text-sm font-medium text-gray-300 bg-neutral-700 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {project ? 'Update' : 'Create'} Project
      </button>
    </div>
  </form>
  )
}


