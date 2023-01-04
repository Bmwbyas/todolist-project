import axios from "axios";
import {
    LoginAuthDataType,
    ResponseApiType,
    ResponseGetTaskType,
    TaskAPIType,
    TodolistsAPIType,
    UpdateTaskTitleType
} from "./types";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {'API-KEY': 'dc5ef090-3a81-4b2e-b560-18d471d90b82'}
})

export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistsAPIType[]>('/todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseApiType<{ item: TodolistsAPIType }>>('/todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseApiType<{}>>(`/todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseApiType<TodolistsAPIType>>(`/todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<ResponseGetTaskType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseApiType<{item:TaskAPIType}>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseApiType<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, newObj: UpdateTaskTitleType) {
        return instance.put<ResponseApiType<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, newObj)
    },
}
export const authAPI={
    loginAuth(data:LoginAuthDataType){
        return instance.post<ResponseApiType<{userId?:string}>>('/auth/login',data)
    },
    me(){
        return instance.get<ResponseApiType<{ id:number,email:string,login:string }>>( '/auth/me')
    },
    logOut(){
        return instance.delete<ResponseApiType<{}>>('/auth/login')
    }
}

export enum TaskStatuses{
    New=0,
    Inprogress=1,
    Completed=2,
    Draft=3
}
export enum TaskPriorities{
    Low=0,
    Middle=1,
    Hi=2,
    Urgently=3,
    Later=4
}
