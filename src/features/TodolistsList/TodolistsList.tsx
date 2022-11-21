import React, {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
    addedTodolist,
    changeTitleTodolistTC,
    changeTodolistFilterAC,
    deleteTodolist,
    fetchTodolist,
    FilterValuesType
} from "./todolists-reducer";
import {addedTask, removeTaskTC, updateTask} from "./tasks-reducer";
import {TaskStatuses} from "../../api/todolist-api";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AdditemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {Navigate} from "react-router-dom";
type PropsType={
    demo?:any
}
export const TodolistsList: React.FC = ({demo=false}:PropsType) => {
    const todolists = useAppSelector(state => state.todolists)
    const tasks = useAppSelector(state => state.tasks)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(demo||!isLoggedIn){return}
        dispatch(fetchTodolist({}))
    }, [dispatch])

    const removeTask = useCallback(function (taskId: string, todolistId: string) {

        dispatch(removeTaskTC({ taskId, todolistId}));
    }, [dispatch]);

    const addTask = useCallback(function (title: string, todolistId: string) {

        dispatch(addedTask({title, todolistId}));
    }, [dispatch]);

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {

        dispatch(updateTask({todolistId, taskId:id, newUpdateTask:{status}}));
    }, [dispatch]);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        dispatch(updateTask({todolistId, taskId:id, newUpdateTask:{title:newTitle}}));
    }, [dispatch]);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {

        dispatch(changeTodolistFilterAC({id:todolistId, filter:value}));
    }, [dispatch]);

    const removeTodolist = useCallback(function (id: string) {
        dispatch(deleteTodolist({todolistId:id}))
    }, [dispatch]);

    const changeTodolistTitle = useCallback((id: string, title: string) => {

        dispatch(changeTitleTodolistTC({todolistId:id, title}));
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addedTodolist({title}));
    }, [dispatch]);

    if(!isLoggedIn){
        return <Navigate to={'/login'}/>
    }
    return (<> <Grid container style={{padding: "20px"}}>
        <AddItemForm  addItem={addTodolist}/>
    </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {

                    let tasksForTodolist = tasks[tl.id];

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: "10px"}}>
                            <Todolist
                                todolist={tl}
                                tasks={tasksForTodolist}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>)
}