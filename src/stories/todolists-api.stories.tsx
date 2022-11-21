import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then(data => setState(data))
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [titleTodolist, setTitleTodolist] = useState('')

    const onCreateTodolist = () => {
        todolistAPI.createTodolist(titleTodolist)
            .then(response => setState(response.data))
    }
    return <div> {JSON.stringify(state)}
        <input placeholder={'enter title todolist'} value={titleTodolist}
               onChange={(e) => setTitleTodolist(e.currentTarget.value)}/>
        <button onClick={onCreateTodolist}>click me</button>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const onDeleteTodolist = () => {
        return todolistAPI.deleteTodolist(todolistId)
            .then(response => setState(response.data))
    }
    return <div> {JSON.stringify(state)}
        <input placeholder={'enter title todolist'} value={todolistId}
               onChange={(e) => setTodolistId(e.currentTarget.value)}/>
        <button onClick={onDeleteTodolist}>click me</button>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [titleTodolist, setTitleTodolist] = useState('')

    const onUpdateTodolist = () => {
        todolistAPI.updateTodolist(todolistId, titleTodolist)
            .then(response => setState(response.data))
    }

    return <> <div>{JSON.stringify(state)}</div>
        <div>
            <input placeholder={'enter ID'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'enter title todolist'} value={titleTodolist}
                   onChange={(e) => setTitleTodolist(e.currentTarget.value)}/>
            <button onClick={onUpdateTodolist}>click me</button>
        </div>
    </>
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')


    const onGettingTaskCustomTodolist=()=>{
        todolistAPI.getTasks(todolistId)
            .then(response => setState(response.data.items))
    }
    return <> <div>{JSON.stringify(state)}</div>
    <div>
        <input placeholder={'enter title todolist'} value={todolistId}
                onChange={(e) => setTodolistId(e.currentTarget.value)}/>
        <button onClick={onGettingTaskCustomTodolist}>click me</button>
    </div>
    </>

}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('')
    const [todolistId, setTodolistId] = useState('')
    const onCreateTodolist = () => {
        todolistAPI.createTask(todolistId,title)
            .then(response => setState(response.data.messages))
    }
    return <div> {JSON.stringify(state)}
        <input placeholder={'enter  todolist id'} value={todolistId}
               onChange={(e) => setTodolistId(e.currentTarget.value)}/>
        <input placeholder={'enter  title'} value={title}
               onChange={(e) => setTitle(e.currentTarget.value)}/>
        <button onClick={onCreateTodolist}>click me</button>
    </div>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')
    const onDeleteTodolist = () => {
        return todolistAPI.deleteTask(todolistId,taskId)
            .then(response => setState(response.data))
    }
    return <div> {JSON.stringify(state)}
        <input placeholder={'enter  todolist id'} value={todolistId}
               onChange={(e) => setTodolistId(e.currentTarget.value)}/>
        <input placeholder={'enter  task id'} value={taskId}
               onChange={(e) => setTaskId(e.currentTarget.value)}/>
        <button onClick={onDeleteTodolist}>click me</button>
    </div>
}
export const UpdateTasksTitle = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('')
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')

    const onUpdateTodolist = () => {
        const newObj={
            title: title,
            description: 'string',
            completed: false,
            status: 1,
            priority: 1,
            startDate: new Date(),
            deadline: new Date()
        }
        todolistAPI.updateTask(todolistId, taskId,newObj)
            .then(response => setState(response.data))
    }

    return <> <div>{JSON.stringify(state)}</div>
        <div>
            <input placeholder={'enter TodolistID'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'enter new title'} value={title}
                   onChange={(e) => setTitle(e.currentTarget.value)}/>
            <input placeholder={'enter  task id'} value={taskId}
                   onChange={(e) => setTaskId(e.currentTarget.value)}/>
            <button onClick={onUpdateTodolist}>click me</button>
        </div>
    </>
}