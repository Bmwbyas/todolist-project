
import {addTodolistAC, TodolistDomainType, todolistsReducer} from './todolists-reducer';
import {tasksReducer, RootTasksStateType} from './tasks-reducer';

test('ids should be equals', () => {
    const startTasksState: RootTasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const action = addTodolistAC({todolist:{
        id: 'todolistId1',
        title: "What to learn",
        addedDate: '',
        order: 0
    }});

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
});
