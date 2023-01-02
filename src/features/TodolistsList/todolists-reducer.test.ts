import {
    addTodolistAC,
    changeTodolistEntityStatus,
    changeTodolistFilterAC,
    FilterValuesType,
    removeTodolistAC,
    setTodolists,
    TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {changeTitleTodolistTC} from "./todolist-actions";


let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = [];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {
            id: todolistId1,
            title: "What to learn",
            addedDate: '',
            order: 0,
            filter: 'all',
            entityStatus:"idle"
        },

        {
            id: todolistId2,
            title: "What to buy",
            addedDate: '',
            order: 0,
            filter: 'all',
            entityStatus:"idle"
        }
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC({todolistId:todolistId1}))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let newTodolistTitle = {
        id: todolistId1,
        title: "What",
        addedDate: '',
        order: 0,
        filter: 'all',
        entityStatus:"idle"
    };

    const endState = todolistsReducer([{
        id: todolistId2,
        title: "What to learn",
        addedDate: '',
        order: 0,
        filter: 'all',
        entityStatus:"idle"
    }], addTodolistAC({todolist:newTodolistTitle}))

    expect(endState.length).toBe(2);
    expect(endState[0].id).toBe(todolistId1);
    expect(endState[0].title).toBe("What");
    expect(endState[0].filter).toBe("all");
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    const action = changeTitleTodolistTC.fulfilled({id:todolistId2, title:newTodolistTitle},'',{todolistId:todolistId2, title:newTodolistTitle});

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";

    const action = changeTodolistFilterAC({id:todolistId2,filter: newFilter});

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
test(' todolist should be render', () => {


    const action = setTodolists({
       todolists: [{
            id: 'todolistId1',
            title: "What to learn",
            addedDate: '',
            order: 0,

        }]
    });

    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(1);
    expect(endState[0].filter).toBe('all');
});
test('todolist entityStatus should be changed', () => {

    const action = changeTodolistEntityStatus({todolistId:todolistId2,entityStatus: 'loading'});

    const endState = todolistsReducer(startState, action);

    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe('loading');
});

