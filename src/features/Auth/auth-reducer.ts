import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loginAuth} from "./auth-actions";

const authinitialState = {
    isLoggedIn: false
}

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







