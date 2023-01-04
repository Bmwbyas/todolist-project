import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {changeTitleTodolistTC} from "./todolist-actions";
import {TodolistsAPIType} from "../../api/types";
import {RequestStatusType} from "../../app/appTypes";


const initialState: Array<TodolistDomainType> = []

// export const fetchTodolist_ = (): AppThunk => (dispatch) => {
//     dispatch(appSetStatus({status: 'loading'}))
//     todolistAPI.getTodolists()
//         .then(response => {
//             dispatch(setTodolists({todolists: response.data}))
//             dispatch(appSetStatus({status: 'succeeded'}))
//         })
//         .catch((err: AxiosError) => {
//             handleServerNetworkError(dispatch, err)
//         })
// }

// export const changeTitleTodolistTC_ = (todolistId: string, title: string): AppThunk => {
//     return (dispatch) => {
//         dispatch(appSetStatus({status: 'loading'}))
//         todolistAPI.updateTodolist(todolistId, title)
//             .then(response => {
//                 if (response.data.resultCode === 0) {
//                     dispatch(changeTodolistTitleAC({id: todolistId, title}))
//                     dispatch(appSetStatus({status: "succeeded"}))
//                 } else {
//                     handleServerAppError(dispatch, response.data)
//                 }
//             }).catch((error) => handleServerNetworkError(dispatch, error))
//
//     }
// }


export const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            // if(index>-1){
            state.splice(index, 1)
            // }

            // return state.filter(tl => tl.id !== action.payload.todolistId)
        },
        changeTodolistEntityStatus(state, action: PayloadAction<{ todolistId: string, entityStatus: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index] = {...state[index], entityStatus: action.payload.entityStatus}
            // return  state.map(tl => tl.id === action.payload.todolistId ? {
            //     ...tl,
            //     entityStatus: action.payload.entityStatus
            // } : tl)

        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistsAPIType }>) {

            state.unshift({
                ...action.payload.todolist,
                filter: 'all' as FilterValuesType,
                entityStatus: 'idle' as RequestStatusType
            })
        },
        // changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
        //     const currentTodolist = state.find(t => t.id === action.payload.id)!
        //     currentTodolist.title = action.payload.title
        // },
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const todolist = state.find(t => t.id === action.payload.id)!
            todolist.filter = action.payload.filter
        },
        setTodolists(state, action: PayloadAction<{ todolists: TodolistsAPIType[] }>) {
            return action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: 'idle'}))
        }
    },
    extraReducers: (builder) => {
        builder.addCase(changeTitleTodolistTC.fulfilled, (state, action) => {
            const currentTodolist = state.find(t => t.id === action.payload!.id)
            currentTodolist!.title = action.payload!.title
        })
    }
})
export const todolistsReducer = slice.reducer
export const {
    addTodolistAC,
    removeTodolistAC,
    changeTodolistFilterAC,
    changeTodolistEntityStatus,
    setTodolists
} = slice.actions
// export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodosActionsType): Array<TodolistDomainType> => {
//     switch (action.type) {
//         case 'REMOVE-TODOLIST':
//             return state.filter(tl => tl.id !== action.id)
//
//         case 'ADD-TODOLIST': {
//             return [{
//                 ...action.todolist,
//                 filter: 'all',
//                 entityStatus: 'idle'
//             }, ...state]
//         }
//         case 'CHANGE-TODOLIST-TITLE':
//             return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
//
//         case 'CHANGE-TODOLIST-FILTER':
//             return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
//         case "SET-TODOLISTS": {
//             return action.todolists.map(tl => ({...tl, filter: "all", entityStatus: 'idle'}))
//         }
//         case "CHANGE-ENTITYSTATUS":
//             return state.map(tl => tl.id === action.todolistId ? {...tl, entityStatus: action.entityStatus} : tl)
//         default:
//             return state;
//     }
// }
//action

// export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', id: todolistId}) as const
// export const changeTodolistEntityStatus = (todolistId: string, entityStatus: RequestStatusType) => ({
//     type: 'CHANGE-ENTITYSTATUS',
//     todolistId,
//     entityStatus
// }) as const
// export const addTodolistAC = (todolist: TodolistsAPIType) => ({type: 'ADD-TODOLIST', todolist}) as const
// export const changeTodolistTitleAC = (id: string, title: string) => ({
//     type: 'CHANGE-TODOLIST-TITLE',
//     id: id,
//     title: title
// }) as const
// export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
//     type: 'CHANGE-TODOLIST-FILTER',
//     id,
//     filter
// }) as const
// export const setTodolists = (todolists: TodolistsAPIType[]) => {
//     return {type: 'SET-TODOLISTS', todolists} as const
// }

//thunk

//types

// export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
// export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
// export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
// export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
// export type SetTodolistsActionType = ReturnType<typeof setTodolists>
// export type TodosActionsType =
//     | ReturnType<typeof removeTodolistAC>
//     | ReturnType<typeof addTodolistAC>
//     | ChangeTodolistTitleActionType
//     | ChangeTodolistFilterActionType
//     | ReturnType<typeof setTodolists>
//     | ReturnType<typeof changeTodolistEntityStatus>
export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistsAPIType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
