import {TaskAPIType} from "../../api/todolist-api";
import {RequestStatusType} from "../../app/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolistAC, removeTodolistAC, setTodolists} from "./todolists-reducer";
import {addedTask, fetchTask, removeTaskTC, updateTask} from "./tasks-actions";

const initialState: RootTasksStateType = {}

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


export type RootTasksStateType = {
    [key: string]: TasksStateType[]
}
export type TasksStateType = TaskAPIType & { entityStatus: RequestStatusType }