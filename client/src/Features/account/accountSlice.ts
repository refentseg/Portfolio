import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";
import { router } from "../../app/router/Routes";

interface AccountState {
    token: string | null;
}

const initialState: AccountState = {
    token: null
};

export const registerUser = createAsyncThunk<string, FieldValues>(
    'account/registerUser',
    async (data, thunkApi) => {
        try {
            const response = await agent.Account.register(data);
            const { token } = response;
            
            localStorage.setItem('token', token);
            toast.success("User registered successfully");
            
            return token;
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.response?.data || 'An error occurred' });
        }
    }
);

export const signInUser = createAsyncThunk<string, FieldValues>(
    'account/signInUser',
    async (data, thunkApi) => {
        try {
            const response = await agent.Account.login(data);
            const { token } = response;
            
            localStorage.setItem('token', token);
            return token;
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchCurrentUser = createAsyncThunk<string>(
    'account/fetchCurrentUser',
    async (_, thunkApi) => {
        const token = localStorage.getItem('token');
        if (!token) return thunkApi.rejectWithValue({ error: 'No token found' });

        try {
            // Optionally verify token or fetch user info if needed
            return token;
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data });
        }
    },
    {
        condition: () => {
            return !!localStorage.getItem('token');
        }
    }
);

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        signOut: (state) => {
            state.token = null;
            localStorage.removeItem('token');
            router.navigate('/');
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCurrentUser.rejected, (state) => {
            state.token = null;
            localStorage.removeItem('token');
            toast.error('Session expired - please login again');
            router.navigate('/');
        });
        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
            state.token = action.payload;
        });
        builder.addMatcher(isAnyOf(signInUser.rejected), (_state, action) => {
            throw action.payload;
        });
    }
});

export const { signOut } = accountSlice.actions;