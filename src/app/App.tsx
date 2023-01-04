import React, {useEffect} from 'react'
import './App.css';
import {AppBar, Button, IconButton, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

import {CircularProgress, LinearProgress} from "@mui/material";
import {useAppSelector} from "./hooks";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {authActions, authSelectors, Login} from '../features/Auth';
import {Navigate, Route, Routes} from 'react-router-dom';
import {appSelectors} from "./index";
import {TodolistsList} from "../features/TodolistsList";

import {useActions} from "../utils/redux-utils";


type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    console.log("App is called")
    const status = useAppSelector(appSelectors.selectStatus)
    const isInitialized = useAppSelector(appSelectors.selectisInitialized)
    const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)

    const {logOutAuth, initializeAppTC} = useActions(authActions)

    useEffect(() => {
        initializeAppTC()
    }, [])
    const logOutHandler = () => {
        logOutAuth()
    }
    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn ? <Button color="inherit" onClick={logOutHandler}>LogOut</Button> :
                        <Button color="inherit">Login</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress color="secondary"/>}
            </AppBar>
            <ErrorSnackbar/>

            <Routes>
                <Route path='/' element={<TodolistsList/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/404' element={<h1>PAGE NOT FOUND</h1>}/>
                <Route path='*' element={<Navigate to='/404'/>}/>
            </Routes>

        </div>
    );
}

export default App;
