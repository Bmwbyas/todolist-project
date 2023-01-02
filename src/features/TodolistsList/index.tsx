import * as tasksActions from './tasks-actions'
import * as todosAsyncActions from './todolist-actions'
import {slice} from './todolists-reducer'
import * as todosSelectors from './selectors'
import {TodolistsList} from "./TodolistsList";

const todosActions={
    ...todosAsyncActions,
  ...slice.actions

}
export {
    todosSelectors,
    tasksActions,
    todosActions,
    TodolistsList
}