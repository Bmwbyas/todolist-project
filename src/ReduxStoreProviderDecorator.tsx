import React from "react";
import {Provider} from 'react-redux'
import {combineReducers} from 'redux'

import {v1} from 'uuid'
import {todolistsReducer} from "./features/TodolistsList/todolists-reducer";
import {tasksReducer} from "./features/TodolistsList/tasks-reducer";
import {TaskPriorities, TaskStatuses} from "./api/todolist-api";
import {appReducer} from "./app/app-reducer";
import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./features/Auth/auth-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app:appReducer,
    auth:authReducer
})

const initialGlobalState = {
    todolists: [
        {
            id: "todolistId1",
            title: "What to learn",
            addedDate: 'string',
            order: 0,
            filter: "all",
            entityStatus:'idle'
        },
        {
            id: "todolistId2",
            title: "What to buy",
            addedDate: 'string',
            order: 0,
            filter: "all",
            entityStatus:'idle'
        },

    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(),
                title: 'html',
                description: 'string',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: new Date(),
                deadline: new Date(),
                todoListId: "todolistId1",
                order: 0,
                addedDate: ' ',
                entityStatus:'idle'
            },
            {
                id: v1(),
                title: 'css',
                description: 'string',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: new Date(),
                deadline: new Date(),
                todoListId: "todolistId1",
                order: 0,
                addedDate: ' ',
                entityStatus:'idle'
            },

        ],
        ["todolistId2"]: [
            {
                id: v1(),
                title: 'look',
                description: 'string',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: new Date(),
                deadline: new Date(),
                todoListId: "todolistId2",
                order: 0,
                addedDate: ' ',
                entityStatus:'loading'
            },
            {
                id: v1(),
                title: 'see',
                description: 'string',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: new Date(),
                deadline: new Date(),
                todoListId: "todolistId2",
                order: 0,
                addedDate: ' ',
                entityStatus:'idle'
            },
        ]
    },
    app:{status:'idle',error:null,isInitialized:false},
    auth:{isLoggedIn:false}
};

export const storyBookStore = configureStore({
    reducer: rootReducer,

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),

})

export const ReduxStoreProviderDecorator = (storyFn: () => JSX.Element) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}