import * as tasksActions from './tasks-actions'
import * as todosAsyncActions from './todolist-actions'
import {slice} from './todolists-reducer'
import * as todosSelectors from './selectors'

const todosActions={
    ...todosAsyncActions,
  ...slice.actions

}
export {
    todosSelectors,
    tasksActions,
    todosActions
}