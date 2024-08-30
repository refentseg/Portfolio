import axios, { AxiosError, AxiosResponse } from "axios";
import { Paginatedresponse } from "../models/pagination";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

const sleep = () => new Promise(resolve=>setTimeout(resolve,500));

axios.defaults.baseURL =import.meta.env.VITE_APP_API_URL;
axios.defaults.withCredentials=true;

const responseBody = (response:AxiosResponse) => response.data;

axios.interceptors.response.use(async response =>{
    if(import.meta.env.DEV) await sleep();
    //pagination in small letters because axios works with small letters
    const pagination = response.headers['pagination'];
    if(pagination){
        response.data = new Paginatedresponse(response.data,JSON.parse(pagination));
        return response 
    }
    return response
},
    (error:AxiosError)=>{
    const {data,status} = error?.response as AxiosResponse;
    switch (status) {
        case 400:
            if(data.errors){
                const modelStateErrors: string[] = [];
                for (const key in data.errors){
                    if(data.errors[key]){
                        modelStateErrors.push(data.errors[key])
                    }

                }
                throw modelStateErrors.flat()
            }
            toast.error(data.title)
            break;
        case 401:
            toast.error(data.title)
            break;
        case 403:
            toast.error("You are not allowed to do that")
            break;
        case 500:
            router.navigate('/server-error',{state:{error:data}})
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
})

const requests ={
    get:(url:string,params?:URLSearchParams)=>axios.get(url,{params}).then(responseBody),
    post:(url:string,body:object)=>axios.post(url,body).then(responseBody),
    put:(url:string,body:object)=>axios.put(url,body).then(responseBody),
    delete:(url:string)=>axios.delete(url).then(responseBody),
    postForm:(url:string,data:FormData) => axios.post(url,data,{
        headers:{'Content-type':'multipart/form-data'}
    }).then(responseBody),
    putForm:(url:string,data:FormData) => axios.put(url,data,{
        headers:{'Content-type':'multipart/form-data'}
    }).then(responseBody)
}

function createFormData(item:any) {
    const formData = new FormData();
    for (const key in item){
        formData.append(key,item[key])
    }
    return formData;
}

const Admin ={
    createProject: (project:any) => requests.postForm('project',createFormData(project)),
    updateProject: (project:any) => requests.putForm('project',createFormData(project)),
    deleteProject: (id:number) => requests.delete(`projects/${id}`),
}

const Projects = {
    list:(params: URLSearchParams)=>requests.get('project',params),
    details:(id:number) => requests.get(`project/${id}`),
}

const agent = {
    Admin,
    Projects
}

export default agent;