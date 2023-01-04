
import {createAsyncThunk} from "@reduxjs/toolkit";
import {appSetStatus} from "../../app/app-reducer";
import {TaskPriorities, TaskStatuses, todolistAPI} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AppRootStateType} from "../../app/store";
import {changeAntityStatusTask} from "./tasks-reducer";

export const fetchTask = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(appSetStatus({status: 'loading'}))
    try {
        const res = await todolistAPI.getTasks(todolistId)
        thunkAPI.dispatch(appSetStatus({status: "succeeded"}))
        return {tasks: res.data.items, todolistId}
    } catch (error) {
        const err: any = error
        handleServerNetworkError(thunkAPI.dispatch, err)
        return thunkAPI.rejectWithValue({errors: [err.message], fieldsErrors: undefined})
    }

})
export const removeTaskTC = createAsyncThunk('tasks/removeTask', async (params: { taskId: string, todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(appSetStatus({status: 'loading'}))
    thunkAPI.dispatch(changeAntityStatusTask({taskId: params.taskId, todolistId: params.todolistId, status: 'loading'}))
    try {
        const res = await todolistAPI.deleteTask(params.todolistId, params.taskId)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(appSetStatus({status: "succeeded"}))
            thunkAPI.dispatch(changeAntityStatusTask({
                taskId: params.taskId,
                todolistId: params.todolistId,
                status: 'succeeded'
            }))
            return ({taskId: params.taskId, todolistId: params.todolistId})
        } else {
            handleServerAppError(thunkAPI.dispatch, res.data)

        }
    } catch (error) {
        const err: any = error
        handleServerNetworkError(thunkAPI.dispatch, err)

    }

})

export const addedTask = createAsyncThunk('tasks/addedTask', async (params: { title: string, todolistId: string }, {dispatch}) => {
    dispatch(appSetStatus({status: 'loading'}))

    const response = await todolistAPI.createTask(params.todolistId, params.title)
    try {
        if (response.data.resultCode === 0) {
            dispatch(appSetStatus({status: "succeeded"}))
            return {task: response.data.data.item}
        } else {
            handleServerAppError(dispatch, response.data)
        }
    } catch (error: any) {
        handleServerNetworkError(dispatch, error)
    }
})

type UpdateTaskType = {
    title?: string
    description?: string
    completed?: boolean
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: Date
    deadline?: Date
}
export const updateTask = createAsyncThunk('tasks/updateTask', async (params: { todolistId: string, taskId: string, newUpdateTask: UpdateTaskType }, {
    dispatch,
    getState
}) => {
    dispatch(appSetStatus({status: 'loading'}))
    dispatch(changeAntityStatusTask({taskId: params.taskId, todolistId: params.todolistId, status: 'loading'}))
    const state = getState() as AppRootStateType
    let task = state.tasks[params.todolistId].find(task => params.taskId === task.id)
    if (!task) {
        throw new Error('task no found')
    }
    let newObj = {...task, ...params.newUpdateTask}
    try {
        const response = await todolistAPI.updateTask(params.todolistId, params.taskId, newObj)

        if (response.data.resultCode === 0) {
            dispatch(appSetStatus({status: "succeeded"}))
            dispatch(changeAntityStatusTask({
                taskId: params.taskId,
                todolistId: params.todolistId,
                status: 'succeeded'
            }))
            return {todolistId: params.todolistId, taskId: params.taskId, newObj: params.newUpdateTask}
        } else {
            handleServerAppError(dispatch, response.data)
        }
    } catch (error: any) {
        handleServerNetworkError(dispatch, error)
    }
})