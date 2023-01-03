import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, IconButton} from '@material-ui/core'
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan'
import {Delete} from '@material-ui/icons'

import {TaskStatuses} from "../../../../api/todolist-api";
import {TasksStateType} from "../../tasks-reducer";
import {useActions} from "../../../../app/store";
import {tasksActions} from "../../index";



type TaskPropsType = {

    task: TasksStateType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {

    const  {removeTaskTC,  updateTask} = useActions(tasksActions)

    const onClickHandler = () => removeTaskTC({taskId: props.task.id, todolistId: props.todolistId})
    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        updateTask({
            taskId: props.task.id,
            newUpdateTask: {
                status: newIsDoneValue ?
                    TaskStatuses.Completed : TaskStatuses.New
            },
            todolistId: props.todolistId
        })
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        updateTask({taskId: props.task.id, newUpdateTask: {title: newValue}, todolistId: props.todolistId})
    }, [ props.task.id, props.todolistId]);


    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeTaskStatusHandler}
        />

        <EditableSpan disabled={props.task.entityStatus === 'loading'} value={props.task.title}
                      onChange={onTitleChangeHandler}/>
        <IconButton disabled={props.task.entityStatus === 'loading'} onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})
