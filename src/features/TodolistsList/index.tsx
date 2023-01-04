import * as tasksActions from './tasks-actions'
import * as todosAsyncActions from './todolist-actions'
import {slice, todolistsReducer} from './todolists-reducer'
import * as todosSelectors from './selectors'
import {TodolistsList} from "./TodolistsList";
import { tasksReducer } from './tasks-reducer';

const todosActions={
    ...todosAsyncActions,
  ...slice.actions

}
export {
    todosSelectors,
    tasksActions,
    todosActions,
    TodolistsList,
    tasksReducer,
    todolistsReducer
}