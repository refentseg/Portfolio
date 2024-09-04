import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";
import { router } from "../../app/router/Routes";
import { User } from "../../app/models/user";


interface AccountState{
    user:User| null;
}

const initialState :AccountState ={
  user:null
}

export const registerUser = createAsyncThunk<User, FieldValues>(
    'account/registerUser',
    async (data, thunkApi) => {
      try {
        const userDto = await agent.Account.register(data);
        const { ...user } = userDto;
        
        localStorage.setItem('user', JSON.stringify(user));
        toast.success("User logged in suceessfully")
        
        return user;
      } catch (error: any) {
        // Handle and return error information
        return thunkApi.rejectWithValue({ error: error.response?.data || 'An error occurred' });
      }
    }
  );

export const signInUser = createAsyncThunk<User,FieldValues>(
    'account/signInUser',
    async (data,thunkApi) =>{
        try{
         const userDto = await agent.Account.login(data);
         const {...user} = userDto;
         localStorage.setItem('user',JSON.stringify(user))
         return user;
        }catch(error:any){
            return thunkApi.rejectWithValue({error:error.data})
        }
    }
)

export const accountSlice = createSlice ({
    name:'account',
    initialState,
    reducers:{
        signOut:(state) =>{
            state.user = null;
            localStorage.removeItem('user');
            router.navigate('/')   
        },
        setUser:(state,action) =>{
            const claims = JSON.parse(atob(action.payload.token.split('.')[1]));
            const roles = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            state.user = {...action.payload, roles: typeof(roles) === 'string' ? [roles] : roles};
        }
    },
    extraReducers:(builder=>
    {
        builder.addMatcher(isAnyOf(signInUser.fulfilled),(state,action)=>{
            const claims = JSON.parse(atob(action.payload.token.split('.')[1]));
            const roles = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            state.user = {...action.payload, roles: typeof(roles) === 'string' ? [roles] : roles};
        })
        builder.addMatcher(isAnyOf(signInUser.rejected),(_state,action)=>{
           throw action.payload;
    }
    )
    })
})

export const {signOut, setUser} = accountSlice.actions;