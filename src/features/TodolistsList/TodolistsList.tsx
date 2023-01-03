import React, {useEffect} from "react";
import {useAppSelector} from "../../app/hooks";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AdditemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {Navigate} from "react-router-dom";
import {selectIsLoggedIn} from "../Auth/selectors";
import {todosActions, todosSelectors} from "./index";
import {useActions} from "../../app/store";

type PropsType={
    demo?:any
}
export const TodolistsList: React.FC = ({demo=false}:PropsType) => {
    const todolists = useAppSelector(todosSelectors.selectTodolists)
    const tasks = useAppSelector(todosSelectors.selectTasks)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const { addedTodolist,fetchTodolist}=useActions(todosActions)

    useEffect(() => {
        if(demo||!isLoggedIn){return}
        fetchTodolist({})
    }, [])

    if(!isLoggedIn){
        return <Navigate to={'/login'}/>
    }
    return (<> <Grid container style={{padding: "20px"}}>
        <AddItemForm  addItem={addedTodolist}/>
    </Grid>
        <Grid container spacing={3} style={{flexWrap:"nowrap", overflowX:"scroll"}}>
            {
                todolists.map(tl => {

                    let tasksForTodolist = tasks[tl.id];

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: "10px", width:'300px',border:'1px solid green'}}>
                            <Todolist
                                todolist={tl}
                                tasks={tasksForTodolist}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>)
}