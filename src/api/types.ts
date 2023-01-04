//types
import {TaskPriorities, TaskStatuses} from "./todolist-api";

export type LoginAuthDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
export type TodolistsAPIType = {
    "id": string
    "title": string
    "addedDate": string
    "order": number
}
export type TaskAPIType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type ResponseApiType<D> = {
    resultCode: number
    messages: string[]
    fieldsErrors?: Array<{ field: string, error: string }>
    data: D
}
export type UpdateTaskTitleType = {
    title: string
    description: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: Date
    deadline: Date
}
export type ResponseGetTaskType = {
    items: TaskAPIType[]
    totalCount: number
    error: string
}

