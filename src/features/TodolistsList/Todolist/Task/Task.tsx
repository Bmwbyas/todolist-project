import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, IconButton} from '@material-ui/core'
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan'
import {Delete} from '@material-ui/icons'

import {TaskStatuses} from "../../../../api/todolist-api";
import {TasksStateType} from "../../tasks-reducer";


type TaskPropsType = {
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (params:{taskId: string, todolistId: string}) => void
    task: TasksStateType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {

    const onClickHandler = () => props.removeTask({taskId:props.task.id, todolistId:props.todolistId})
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue?TaskStatuses.Completed:TaskStatuses.New, props.todolistId)
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.changeTaskTitle,props.task.id, props.changeTaskTitle, props.todolistId]);


    return <div key={props.task.id} className={props.task.status===TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.status===TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan disabled={props.task.entityStatus==='loading'} value={props.task.title} onChange={onTitleChangeHandler}/>
        <IconButton disabled={props.task.entityStatus==='loading'}  onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})
