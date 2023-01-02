import {tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {ActionCreatorsMapObject, bindActionCreators, combineReducers} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";

import {authReducer} from "../features/Auth/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "./app-reducer";
import {useAppDispatch} from "./hooks";
import {useMemo} from "react";
// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})
export type RootReducerType=typeof rootReducer
// непосредственно создаём store
// export const store = createStore(rootReducer, applyMiddleware(thunk));
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})
// определить автоматически тип всего объекта состояния

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppActionsType = any
export type AppThunk = ThunkAction<void, AppRootStateType, unknown, AppActionsType>
// export type AppDispatchType=typeof store.dispatch
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AppActionsType>

export function  useActions<T extends ActionCreatorsMapObject<any>>(actions:T){
    const dispatch=useAppDispatch()
 return useMemo(()=>{

      return bindActionCreators(actions,dispatch)
  },[])

}
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
