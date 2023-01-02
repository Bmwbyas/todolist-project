import {authAPI, LoginAuthDataType} from "../../api/todolist-api";
import {appSetInitialized, appSetStatus} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setTodolists} from "../TodolistsList/todolists-reducer";
import {clearTaskAC} from "../TodolistsList/tasks-reducer";

const authinitialState = {
    isLoggedIn: false
}
export const loginAuth = createAsyncThunk<{ isLoggedIn: boolean },
    LoginAuthDataType, {
    rejectValue: {
        errors: string[],
        fieldsErrors: undefined | Array<{ field: string, error: string }>
    }
}>('auth/loginAuth',
    async (data, thunkAPI) => {
        thunkAPI.dispatch(appSetStatus({status: 'loading'}))
        try {
            const res = await authAPI.loginAuth(data)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(appSetStatus({status: 'succeeded'}))
                return {isLoggedIn: true}
            } else {
                handleServerAppError(thunkAPI.dispatch, res.data)
                return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
            }
        } catch (error) {
            const err: any = error
            handleServerNetworkError(thunkAPI.dispatch, err)
            return thunkAPI.rejectWithValue({errors: [err.message], fieldsErrors: undefined})
        }

        // .catch(err=>handleServerAppError(dispatch,err))

    })
// export const loginAuth_ = (data: LoginAuthDataType): AppThunk => (dispatch) => {
//     dispatch(appSetStatus({status: 'loading'}))
//     authAPI.loginAuth(data)
//         .then(response => {
//             if (response.data.resultCode === 0) {
//                 dispatch(setIsLoggedIn({value: true}))
//                 dispatch(appSetStatus({status: 'succeeded'}))
//             } else {
//                 handleServerAppError(dispatch, response.data)
//             }
//         })
//         .catch(err => handleServerAppError(dispatch, err))
// }

export const initializeAppTC = createAsyncThunk('auth/initialized', async (params, {dispatch}) => {
    dispatch(appSetStatus({status: 'loading'}))
    try {
        const response = await authAPI.me()
        if (response.data.resultCode === 0) {
            dispatch(setIsLoggedIn({value: true}));
            dispatch(appSetStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(dispatch, response.data)
        }

    } catch (error:any) {
        handleServerNetworkError(dispatch, error)
    }finally {
        dispatch(appSetInitialized({isInitialized: true}))
    }
})
// export const initializeAppTC_ = (): AppThunk => (dispatch) => {
//     dispatch(appSetStatus({status: 'loading'}))
//     authAPI.me()
//         .then(response => {
//             if (response.data.resultCode === 0) {
//                 dispatch(setIsLoggedIn({value: true}));
//                 dispatch(appSetStatus({status: 'succeeded'}))
//             } else {
//                 handleServerAppError(dispatch, response.data)
//             }
//         })
//         .catch(err => handleServerNetworkError(dispatch, err))
//         .finally(() => dispatch(appSetInitialized({isInitialized: true})))
// }
export const logOutAuth=createAsyncThunk('auth/logoutAuth',async (params,{dispatch})=>{
    dispatch(appSetStatus({status: 'loading'}))
    try {
        const response = await authAPI.logOut()

        if (response.data.resultCode === 0) {
            dispatch(setIsLoggedIn({value: false}))
            dispatch(appSetStatus({status: 'succeeded'}))
            dispatch(setTodolists({todolists: []}))
            dispatch(clearTaskAC())
        } else {
            handleServerAppError(dispatch, response.data)
        }
    }catch (error:any) {
        handleServerNetworkError(dispatch, error)
    }
})
// export const logOutAuth_ = (): AppThunk => (dispatch) => {
//     dispatch(appSetStatus({status: 'loading'}))
//     authAPI.logOut()
//         .then(response => {
//             if (response.data.resultCode === 0) {
//                 dispatch(setIsLoggedIn({value: false}))
//                 dispatch(appSetStatus({status: 'succeeded'}))
//                 dispatch(setTodolists({todolists: []}))
//                 dispatch(clearTaskAC())
//             } else {
//                 handleServerAppError(dispatch, response.data)
//             }
//         })
//         .catch(err => handleServerNetworkError(dispatch, err))
// }
const slice = createSlice({
    name: 'auth',
    initialState: authinitialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers: (builder) => {

        builder.addCase(loginAuth.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        });
    }
})
export const authReducer = slice.reducer

export const {setIsLoggedIn} = slice.actions
//thunk







