import React, {useCallback, useEffect} from 'react'

import {AddItemForm} from '../../../components/AdditemForm/AddItemForm'
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan'
import {Button, IconButton} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import {Task} from './Task/Task'
import {TaskStatuses} from "../../../api/todolist-api";
import {TodolistDomainType} from "../todolists-reducer";
import {TasksStateType} from "../tasks-reducer";
import {useActions} from "../../../app/store";
import {tasksActions, todosActions} from "../index";


type PropsType = {
    todolist:TodolistDomainType
    tasks: TasksStateType[]
    demo?:boolean
}

export const Todolist = React.memo(function ({demo=false,...props}: PropsType) {
    console.log('Todolist is called')
    const { deleteTodolist, changeTodolistFilterAC,changeTitleTodolistTC}=useActions(todosActions)
    const {fetchTask,removeTaskTC,addedTask,updateTask}=useActions(tasksActions)

    useEffect(()=>{
      fetchTask(props.todolist.id)

    },[])
    const changeTaskStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {

        updateTask({todolistId, taskId:id, newUpdateTask:{status}});
    }, [updateTask]);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        updateTask({todolistId, taskId:id, newUpdateTask:{title:newTitle}});
    }, [updateTask]);
    const addTask = useCallback((param:{title: string}) => {
        addedTask({title:param.title, todolistId:props.todolist.id})
    }, [addedTask, props.todolist.id])

    const removeTodolist = () => {
        deleteTodolist({todolistId:props.todolist.id})
    }
    const changeTodolistTitle = useCallback((title: string) => {
        changeTitleTodolistTC({todolistId:props.todolist.id, title})
    }, [changeTitleTodolistTC,props.todolist.id])

    const onAllClickHandler = useCallback(() => changeTodolistFilterAC({filter:'all', id:props.todolist.id}), [changeTodolistFilterAC,props.todolist.id])
    const onActiveClickHandler = useCallback(() => changeTodolistFilterAC({ filter:'active', id:props.todolist.id}), [ changeTodolistFilterAC,props.todolist.id])
    const onCompletedClickHandler = useCallback(() => changeTodolistFilterAC({filter:'completed', id:props.todolist.id}), [ changeTodolistFilterAC,props.todolist.id])

    let tasksForTodolist = props.tasks

    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return <div>
        <h3><EditableSpan disabled={props.todolist.entityStatus==='loading'} value={props.todolist.title} onChange={changeTodolistTitle}/>
            <IconButton disabled={props.todolist.entityStatus==='loading'}  onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus==='loading'}/>
        <div>
            {
                tasksForTodolist.map(t => <Task
                    task={t}
                    changeTaskStatus={changeTaskStatus}
                    changeTaskTitle={changeTaskTitle}
                    removeTask={removeTaskTC}
                    todolistId={props.todolist.id}
                    key={t.id}
                />)
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <Button variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'default'}
            >All
            </Button>
            <Button variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})


