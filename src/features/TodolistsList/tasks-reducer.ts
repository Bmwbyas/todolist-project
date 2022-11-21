import {TaskAPIType, TaskPriorities, TaskStatuses, todolistAPI} from "../../api/todolist-api";

import {AppRootStateType} from "../../app/store";
import {appSetStatus, RequestStatusType} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolistAC, removeTodolistAC, setTodolists} from "./todolists-reducer";

const initialState: RootTasksStateType = {}
//thunk
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
// export const fetchTasks = (todolistId: string): AppThunk => (dispatch) => {
//     dispatch(appSetStatus({status: 'loading'}))
//     todolistAPI.getTasks(todolistId)
//         .then(response => {
//             dispatch(setTaskAC({tasks: response.data.items, todolistId}))
//             dispatch(appSetStatus({status: "succeeded"}))
//         }).catch((error) => {
//         handleServerNetworkError(dispatch, error)
//     })
// }
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
        }else {
            handleServerAppError(thunkAPI.dispatch, res.data)

        }
    } catch (error) {
        const err: any = error
        handleServerNetworkError(thunkAPI.dispatch, err)

    }

})
// export const removeTaskTCs = (taskId: string, todolistId: string): AppThunk => (dispatch) => {
//     dispatch(appSetStatus({status: 'loading'}))
//     dispatch(changeAntityStatusTask({taskId, todolistId, status: 'loading'}))
//     todolistAPI.deleteTask(todolistId, taskId)
//         .then(response => {
//             if (response.data.resultCode === 0) {
//                 dispatch(removeTaskAC({taskId, todolistId}))
//                 dispatch(appSetStatus({status: "succeeded"}))
//                 dispatch(changeAntityStatusTask({taskId, todolistId, status: 'succeeded'}))
//             } else {
//                 handleServerAppError(dispatch, response.data)
//             }
//         }).catch((error: AxiosError) => {
//         handleServerNetworkError(dispatch, error)
//     })
// }
export const addedTask =createAsyncThunk('tasks/addedTask',async (params:{title: string, todolistId: string},{dispatch})=>{
    dispatch(appSetStatus({status: 'loading'}))

    const response= await todolistAPI.createTask(params.todolistId,params.title)
        try {
            if (response.data.resultCode === 0) {
                dispatch(appSetStatus({status: "succeeded"}))
                return {task: response.data.data.item}
            } else {
                handleServerAppError(dispatch, response.data)
            }
        }catch (error:any) {
            handleServerNetworkError(dispatch, error)
        }
})
// export const addedTasks = (title: string, todolistId: string): AppThunk => (dispatch) => {
//     dispatch(appSetStatus({status: 'loading'}))
//
//     todolistAPI.createTask(todolistId, title)
//         .then(response => {
//             if (response.data.resultCode === 0) {
//                 dispatch(addTaskAC({task: response.data.data.item}))
//                 dispatch(appSetStatus({status: "succeeded"}))
//             } else {
//                 handleServerAppError(dispatch, response.data)
//             }
//         }).catch((err: AxiosError) => {
//         handleServerNetworkError(dispatch, err)
//     })
// }
export const updateTask =createAsyncThunk('tasks/updateTask',async (params:{todolistId: string, taskId: string, newUpdateTask: UpdateTaskType},{dispatch,getState})=>{
    dispatch(appSetStatus({status: 'loading'}))
    dispatch(changeAntityStatusTask({taskId:params.taskId, todolistId:params.todolistId, status: 'loading'}))
const state=getState() as AppRootStateType
    let task = state.tasks[params.todolistId].find(task => params.taskId === task.id)
    if (!task) {
        throw new Error('task no found')
    }
    let newObj = {...task, ...params.newUpdateTask}
    try {
    const response =  await  todolistAPI.updateTask(params.todolistId, params.taskId, newObj)

                if (response.data.resultCode === 0) {
                    dispatch(appSetStatus({status: "succeeded"}))
                    dispatch(changeAntityStatusTask({taskId:params.taskId,todolistId: params.todolistId, status: 'succeeded'}))
                    return {todolistId:params.todolistId, taskId:params.taskId, newObj: params.newUpdateTask}
                } else {
                    handleServerAppError(dispatch, response.data)
                }
    }catch (error:any) {
            handleServerNetworkError(dispatch, error)
        }

})
// export const updateTasks = (todolistId: string, taskId: string, newUpdateTask: UpdateTaskType): AppThunk => (dispatch, getState: () => AppRootStateType) => {
//     dispatch(appSetStatus({status: 'loading'}))
//     dispatch(changeAntityStatusTask({taskId, todolistId, status: 'loading'}))
//     let task = getState().tasks[todolistId].find(task => taskId === task.id)
//     if (!task) {
//         throw new Error('task no found')
//     }
//     let newObj = {...task, ...newUpdateTask}
//     todolistAPI.updateTask(todolistId, taskId, newObj)
//         .then(response => {
//             if (response.data.resultCode === 0) {
//                 dispatch(updateTaskAC({todolistId, taskId, newObj: newUpdateTask}))
//                 dispatch(appSetStatus({status: "succeeded"}))
//                 dispatch(changeAntityStatusTask({taskId, todolistId, status: 'succeeded'}))
//             } else {
//                 handleServerAppError(dispatch, response.data)
//             }
//         }).catch((error: AxiosError) => {
//         handleServerNetworkError(dispatch, error)
//     })
// }

//createSlice Tasks
const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        changeAntityStatusTask(state, action: PayloadAction<{ taskId: string, todolistId: string, status: RequestStatusType }>) {
            // {...state,[action.todolistId]:state[action.todolistId].map(task=>task.id===action.taskId?{...task,entityStatus:action.status}:task) }
            const task = state[action.payload.todolistId].find(task => task.id === action.payload.taskId)!
            task.entityStatus = action.payload.status
        },
        // removeTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string }>) {
        //     const tasks = state[action.payload.todolistId]
        //     const index = tasks.findIndex(tl => tl.id === action.payload.taskId)
        //     tasks.splice(index, 1)
        //
        //     // state[action.payload.todolistId]= state[action.payload.todolistId].filter(tl => tl.id !== action.payload.taskId)
        // },
        // addTaskAC(state, action: PayloadAction<{ task: TaskAPIType }>) {
        //     state[action.payload.task.todoListId] = [{
        //         ...action.payload.task,
        //         entityStatus: 'idle'
        //     }, ...state[action.payload.task.todoListId]]
        // },
        // updateTaskAC(state, action: PayloadAction<{ todolistId: string, taskId: string, newObj: UpdateTaskType }>) {
            // state[action.payload.todolistId]= state[action.payload.todolistId]
            // .map(task => task.id === action.payload.taskId ? {...task, ...action.payload.newObj} : task)
            // const tasks = state[action.payload.todolistId]
            // const index = tasks.findIndex(tl => tl.id === action.payload.taskId)
            // tasks[index] = {...tasks[index], ...action.payload.newObj}
        // },
        clearTaskAC(state) {
            state = {}
        }

    },
    extraReducers: (builder) => {

        builder.addCase(addTodolistAC, (state, action) => {
            return {...state, [action.payload.todolist.id]: []}
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todolistId];
        });
        builder.addCase(setTodolists, (state, action) => {
            const stateCopy = {...state}
            return action.payload.todolists.reduce((acc, tl) => {
                stateCopy[tl.id] = []
                return stateCopy
            }, stateCopy)
        });
        builder.addCase(fetchTask.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks.map(task => ({...task, entityStatus: 'idle'}))
        });
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload!.todolistId]
            const index = tasks.findIndex(tl => tl.id === action.payload!.taskId)
            tasks.splice(index, 1)

            // state[action.payload.todolistId]= state[action.payload.todolistId].filter(tl => tl.id !== action.payload.taskId)
        });
        builder.addCase(addedTask.fulfilled, (state, action) => {
            if(action.payload){
            state[action.payload.task.todoListId] = [{
                ...action.payload.task,
                entityStatus: 'idle'
            }, ...state[action.payload.task.todoListId]]
            }
        });
        builder.addCase(updateTask.fulfilled, (state, action) => {
                const tasks = state[action.payload!.todolistId]
                const index = tasks.findIndex(tl => tl.id === action.payload!.taskId)
                tasks[index] = {...tasks[index], ...action.payload!.newObj}
        });
    }
})

export const tasksReducer = slice.reducer
export const {changeAntityStatusTask, clearTaskAC} = slice.actions

// thunk


//types
type UpdateTaskType = {
    title?: string
    description?: string
    completed?: boolean
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: Date
    deadline?: Date
}

export type RootTasksStateType = {
    [key: string]: TasksStateType[]
}
export type TasksStateType = TaskAPIType & { entityStatus: RequestStatusType }