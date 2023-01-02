import {
    changeAntityStatusTask,

    tasksReducer,
    RootTasksStateType
} from './tasks-reducer';

import {addTodolistAC, removeTodolistAC, setTodolists} from './todolists-reducer';
import {TaskStatuses} from "../../api/todolist-api";
import {addedTask, fetchTask, removeTaskTC, updateTask} from "./tasks-actions";

let startState: RootTasksStateType = {};
beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1", title: "CSS", description: 'string', completed: false,
                status: TaskStatuses.New, priority: 0, startDate: new Date(), deadline: new Date(),
                todoListId: "todolistId1", order: 0, addedDate: ' ', entityStatus: 'idle'
            },
            {
                id: "2", title: "JS", description: 'string', completed: true,
                status: TaskStatuses.Completed, priority: 0, startDate: new Date(), deadline: new Date(),
                todoListId: "todolistId1", order: 0, addedDate: ' ', entityStatus: 'idle'
            },
            {
                id: "3", title: "React", description: 'string', completed: false,
                status: TaskStatuses.New, priority: 0, startDate: new Date(), deadline: new Date(),
                todoListId: "todolistId1", order: 0, addedDate: ' ', entityStatus: 'idle'
            },

        ],
        "todolistId2": [
            {
                id: "1", title: "look", description: 'string', completed: false,
                status: TaskStatuses.New, priority: 0, startDate: new Date(), deadline: new Date(),
                todoListId: "todolistId2", order: 0, addedDate: ' ', entityStatus: 'idle'
            },
            {
                id: "2", title: "see", description: 'string', completed: true,
                status: TaskStatuses.Completed, priority: 0, startDate: new Date(), deadline: new Date(),
                todoListId: "todolistId2", order: 0, addedDate: ' ', entityStatus: 'idle'
            },
            {
                id: "3", title: "earing", description: 'string', completed: false,
                status: TaskStatuses.New, priority: 0, startDate: new Date(), deadline: new Date(),
                todoListId: "todolistId2", order: 0, addedDate: ' ', entityStatus: 'idle'
            },
        ]
    };
});

test('correct task should be deleted from correct array', () => {
    const action = removeTaskTC.fulfilled({taskId: "2", todolistId: "todolistId2"},'',{taskId:"2",todolistId: "todolistId2"});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id !== "2")).toBeTruthy();
});
test('correct task should be added to correct array', () => {
    const action = addedTask.fulfilled({
        task: {
            id: "4", title: "earing", description: 'string', completed: false,
            status: TaskStatuses.New, priority: 0, startDate: new Date(), deadline: new Date(),
            todoListId: "todolistId2", order: 0, addedDate: ' '
        },
    },'',{title:"earing",todolistId:"todolistId2"});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("earing");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});
test('status of specified task should be changed', () => {
    const action =updateTask.fulfilled({
        todolistId: "todolistId2", taskId: "2", newObj:
            {
                status: TaskStatuses.New
            }
    },'',{taskId: "2",todolistId: "todolistId2",newUpdateTask:{
            status: TaskStatuses.New
        }});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
});
test('title of specified task should be changed', () => {
    const action = updateTask.fulfilled({
        todolistId: "todolistId2", taskId: "2", newObj:
            {
                title: "yogurt"
            }
    },'',{taskId: "2",todolistId: "todolistId2",newUpdateTask:{title: "yogurt"}});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].title).toBe("JS");
    expect(endState["todolistId2"][1].title).toBe("yogurt");
    expect(endState["todolistId2"][0].title).toBe("look");
});
test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC({
        todolist: {
            id: 'todolistId3',
            title: "What to learn",
            addedDate: '',
            order: 0,

        }
    });

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
test('propertry with todolistId should be deleted', () => {
    const action = removeTodolistAC({todolistId: "todolistId2"});

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});
test('set todolist', () => {
    const action = setTodolists({
        todolists: [{
            id: "todolistId1",
            title: "What to learn",
            addedDate: '',
            order: 0,
        }]
    });
    const endState = tasksReducer({}, action)
    expect(endState["todolistId1"]).toStrictEqual([]);
});

test('set task', () => {
    const action = fetchTask.fulfilled({tasks:[
        {
            id: "1", title: "CSS", description: 'string', completed: false,
            status: TaskStatuses.New, priority: 0, startDate: new Date(), deadline: new Date(),
            todoListId: "todolistId1", order: 0, addedDate: ' ',
        },
        {
            id: "2", title: "JS", description: 'string', completed: true,
            status: TaskStatuses.Completed, priority: 0, startDate: new Date(), deadline: new Date(),
            todoListId: "todolistId1", order: 0, addedDate: ' '
        },
        {
            id: "3", title: "React", description: 'string', completed: false,
            status: TaskStatuses.New, priority: 0, startDate: new Date(), deadline: new Date(),
            todoListId: "todolistId1", order: 0, addedDate: ' '
        },

    ], todolistId:"todolistId1"},'',"todolistId1");


    const endState = tasksReducer({["todolistId1"]: []}, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId1"][0].title).toBe("CSS");

});
test('change entityStatus current task', () => {
    const action = changeAntityStatusTask({taskId:"2", todolistId:"todolistId1",status: 'loading'});


    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId1"][0].entityStatus).toBe("idle");
    expect(endState["todolistId1"][1].entityStatus).toBe("loading");

});