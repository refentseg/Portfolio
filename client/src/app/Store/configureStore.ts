import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { projectsSlice } from "../../Features/Home/Project/projectsSlice";
import { accountSlice } from "../../Features/account/accountSlice";

export const store = configureStore({
    reducer:{
        projects:projectsSlice.reducer,
        account:accountSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> =useSelector;