import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const appInitialState:AppInitialStateType = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}
export type AppInitialStateType={
    status:  RequestStatusType,
    error:null | string,
    isInitialized: boolean
}

const slice=createSlice({
    name:'app',
    initialState:appInitialState,
    reducers:{
        appSetStatus(state,action:PayloadAction<{status:RequestStatusType}>){
            state.status=action.payload.status
        },
        appSetError(state,action:PayloadAction<{error:string|null}>){
            state.error=action.payload.error
        },
        appSetInitialized(state,action:PayloadAction<{isInitialized:boolean}>){
            state.isInitialized=action.payload.isInitialized
        }
    }
})
export const appReducer=slice.reducer
export const {appSetStatus,appSetError,appSetInitialized}=slice.actions
//types

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'