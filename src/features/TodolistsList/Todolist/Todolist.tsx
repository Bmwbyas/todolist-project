import React, {useCallback, useEffect} from 'react'

import {AddItemForm} from '../../../components/AdditemForm/AddItemForm'
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan'
import {Button, IconButton} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import {Task} from './Task/Task'
import {TaskStatuses} from "../../../api/todolist-api";
import {FilterValuesType, TodolistDomainType} from "../todolists-reducer";
import {TasksStateType} from "../tasks-reducer";
import {useActions} from "../../../app/store";
import {tasksActions, todosActions} from "../index";
import {PropTypes} from "@mui/material";

type PropsType = {
    todolist: TodolistDomainType
    tasks: TasksStateType[]
    demo?: boolean
}

export const Todolist = React.memo(function ({demo = false, ...props}: PropsType) {
    console.log('Todolist is called')
    const {deleteTodolist, changeTodolistFilterAC, changeTitleTodolistTC} = useActions(todosActions)
    const {fetchTask, addedTask} = useActions(tasksActions)

    useEffect(() => {
        fetchTask(props.todolist.id)

    }, [])


    const addTask = useCallback((param: { title: string }) => {
        addedTask({title: param.title, todolistId: props.todolist.id})
    }, [addedTask, props.todolist.id])

    const removeTodolist = () => {
        deleteTodolist({todolistId: props.todolist.id})
    }
    const changeTodolistTitle = useCallback((title: string) => {
        changeTitleTodolistTC({todolistId: props.todolist.id, title})
    }, [changeTitleTodolistTC, props.todolist.id])

    const onFilterClickHandler = useCallback((filter: FilterValuesType) => changeTodolistFilterAC({
        filter,
        id: props.todolist.id
    }), [changeTodolistFilterAC, props.todolist.id])


    let tasksForTodolist = props.tasks

    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const renderFilterButton = (buttonFilter: FilterValuesType, color: PropTypes.Color | undefined, text: string) => {

        return <Button variant={props.todolist.filter === buttonFilter ? 'outlined' : 'text'}
                       onClick={() => onFilterClickHandler(buttonFilter)}
                       color={color}>{text}
        </Button>

    }

    return <div style={{position:"relative"}}>
        <h3 style={{overflow:"hidden"}}><EditableSpan disabled={props.todolist.entityStatus === 'loading'} value={props.todolist.title}
                          onChange={changeTodolistTitle}/>
            <IconButton style={{position:"absolute",right:'-15px',top:'-30px'}}
                disabled={props.todolist.entityStatus === 'loading'} onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
        <div>
            {
                tasksForTodolist.map(t => <Task
                    task={t}
                    todolistId={props.todolist.id}
                    key={t.id}
                />)
            }
            {!tasksForTodolist.length && <div>Task list empty</div>}
        </div>
        <div style={{paddingTop: '10px'}}>
            {renderFilterButton('all', 'default', 'All')}
            {renderFilterButton('active', 'primary', 'Active')}
            {renderFilterButton('completed', 'secondary', 'Completed')}
        </div>
    </div>
})




