import {createAsyncThunk} from "@reduxjs/toolkit";
import {appSetStatus} from "../../app/app-reducer";
import {todolistAPI} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {addTodolistAC, changeTodolistEntityStatus, removeTodolistAC, setTodolists} from "./todolists-reducer";

export const fetchTodolist = createAsyncThunk('todolist/fetchTodolists', async (params: {}, {dispatch}) => {
    dispatch(appSetStatus({status: 'loading'}))
    try {
        const res = await todolistAPI.getTodolists()
        dispatch(appSetStatus({status: 'succeeded'}))
        dispatch(setTodolists({todolists: res.data}))

    } catch (error) {
        const err: any = error
        handleServerNetworkError(dispatch, err)
    }
})
export const deleteTodolist = createAsyncThunk('todolists/deleteTodolist', async (param: { todolistId: string }, {dispatch}) => {
    try {
        dispatch(appSetStatus({status: 'loading'}))
        dispatch(changeTodolistEntityStatus({todolistId: param.todolistId, entityStatus: "loading"}))
        const res = await todolistAPI.deleteTodolist(param.todolistId)
        if (res.data.resultCode === 0) {
            dispatch(removeTodolistAC({todolistId: param.todolistId}))
            dispatch(appSetStatus({status: "succeeded"}))
            dispatch(changeTodolistEntityStatus({todolistId: param.todolistId, entityStatus: "succeeded"}))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (error) {
        const err: any = error
        handleServerNetworkError(dispatch, err)
    }
})
// export const deleteTodolist_ = (todolistId: string): AppThunk => (dispatch) => {
//     dispatch(appSetStatus({status: 'loading'}))
//     dispatch(changeTodolistEntityStatus({todolistId, entityStatus: "loading"}))
//     todolistAPI.deleteTodolist(todolistId)
//         .then(response => {
//             if (response.data.resultCode === 0) {
//                 dispatch(removeTodolistAC({todolistId}))
//                 dispatch(appSetStatus({status: "succeeded"}))
//                 dispatch(changeTodolistEntityStatus({todolistId, entityStatus: "succeeded"}))
//             } else {
//                 handleServerAppError(dispatch, response.data)
//             }
//         }).catch((error => {
//         handleServerNetworkError(dispatch, error)
//     }))
// }
export const addedTodolist = createAsyncThunk('todolists/addedTodolist', async (params: { title: string }, {dispatch}) => {
    dispatch(appSetStatus({status: 'loading'}))
    try {
        const response = await todolistAPI.createTodolist(params.title)
        if (response.data.resultCode === 0) {
            dispatch(addTodolistAC({todolist: response.data.data.item}))
            dispatch(appSetStatus({status: "succeeded"}))
        } else {
            handleServerAppError(dispatch, response.data)
        }
    } catch (error) {
        const err: any = error
        handleServerNetworkError(dispatch, err)
    }
})
// export const addedTodolist_ = (title: string): AppThunk => (dispatch) => {
//         dispatch(appSetStatus({status: 'loading'}))
//         todolistAPI.createTodolist(title)
//             .then(response => {
//                 if (response.data.resultCode === 0) {
//                     dispatch(addTodolistAC({todolist: response.data.data.item}))
//                     dispatch(appSetStatus({status: "succeeded"}))
//                 } else {
//                     handleServerAppError(dispatch, response.data)
//                 }
//             }).catch((error) => {
//             handleServerNetworkError(dispatch, error)
//         })
//     }
export const changeTitleTodolistTC = createAsyncThunk('todolist/changeTitleTodolist', async (params: {

    todolistId: string, title: string
}, {dispatch}) => {
    dispatch(appSetStatus({status: 'loading'}))
    try {
        const response = await todolistAPI.updateTodolist(params.todolistId, params.title)
        if (response.data.resultCode === 0) {
            dispatch(appSetStatus({status: "succeeded"}))
            return {id: params.todolistId, title: params.title}
        } else {
            handleServerAppError(dispatch, response.data)

        }
    } catch (error) {
        const err: any = error
        handleServerNetworkError(dispatch, err)
    }
})