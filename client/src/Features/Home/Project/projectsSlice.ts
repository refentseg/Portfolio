import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { MetaData } from "../../../app/models/pagination";
import { Project, ProjectParams } from "../../../app/models/project";
import agent from "../../../app/api/agent";
import { RootState } from "../../../app/Store/configureStore";

interface ProjectsState{
    projectsLoaded:boolean;
    filtersLoaded:boolean;
    status:string;
    projectParams:ProjectParams;
    metaData: MetaData | null;
}

const projectsAdapter = createEntityAdapter<Project>();

function getAxiosParams(projectParams:ProjectParams){
    const params = new URLSearchParams();
    params.append('pageNumber',projectParams.pageNumber.toString());
    params.append('pageSize',projectParams.pageSize.toString());
    params.append('orderBy',projectParams.orderBy);//already a string
    if(projectParams.searchTerm){
        params.append('searchTerm',projectParams.searchTerm);
    }
    return params
}

export const fetchProjectsAsync = createAsyncThunk<Project[], void,{state: RootState}>(
    'projects/fetchProjectsAsync',
    async (_,thunkAPI) =>{
        const params = getAxiosParams(thunkAPI.getState().projects.projectParams)
        try {
            const response = await agent.Projects.list(params);
            thunkAPI.dispatch(setMetaData(response.metaData));
            return response.items

        } catch (error:any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const fetchProjectAsync = createAsyncThunk<Project,number>(
    'projects/fetchProjectAsync',
    async (projectId,thunkAPI) =>{
        try {
            return await agent.Projects.details(projectId);
        } catch (error:any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

function initParams(){
    return{
            pageNumber:1,
            pageSize:6,
            orderBy:'name',      
            brands:[],
            types:[]   
         }
}

export const projectsSlice = createSlice({
    name:'projects',
    initialState:projectsAdapter.getInitialState<ProjectsState>({
        projectsLoaded:false,
        filtersLoaded:false,
        status:'idle',
        projectParams:initParams(),
        metaData:null
    }),
    reducers:{
        setProjectParams:(state,action)=>{
            state.projectsLoaded=false;
            state.projectParams ={...state.projectParams,...action.payload,pageNumber:1};
        },
        setPageNumber:(state,action)=>{
            state.projectsLoaded= false;
            state.projectParams ={...state.projectParams,...action.payload};
        },
        setMetaData:(state,action)=>{
            state.metaData = action.payload
        },
        resetProjectParams:(state)=>{
            state.projectParams = initParams();
        },
        setProject: (state,action) =>{
            projectsAdapter.upsertOne(state,action.payload)
            state.projectsLoaded =false;
        },
        removeProject:(state,action) =>{
            projectsAdapter.removeOne(state,action.payload);
            state.projectsLoaded =false;
        }
    },
    extraReducers:(builder =>{
        builder.addCase(fetchProjectsAsync.pending,(state)=>{
            state.status = 'pendingFetchprojects'
        });
        builder.addCase(fetchProjectsAsync.fulfilled,(state,action)=>{
            projectsAdapter.setAll(state,action.payload)
            state.status ='idle'
            state.projectsLoaded = true;
        });
        builder.addCase(fetchProjectsAsync.rejected,(state,action)=>{
            console.log(action.payload)
            state.status = 'idle'
        });
        builder.addCase(fetchProjectAsync.pending,(state)=>{
            state.status = 'pendingfetchproject'
        });
        builder.addCase(fetchProjectAsync.fulfilled,(state,action)=>{
            projectsAdapter.upsertOne(state,action.payload)
            state.status ='idle'
        });
        builder.addCase(fetchProjectAsync.rejected,(state,action)=>{
            console.log(action)
            state.status = 'idle'
        });
    })
})

export const projectSelectors = projectsAdapter.getSelectors((state:RootState) =>state.projects);
export const {setProjectParams,resetProjectParams,setMetaData,setPageNumber,setProject,removeProject} = projectsSlice.actions;
