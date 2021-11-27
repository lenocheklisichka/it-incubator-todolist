import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    const removeTask = useCallback((id: string, todolistId: string) => {
        const action = removeTaskAC(id, todolistId);
        dispatch(action);
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        const action = addTaskAC(title, todolistId);
        dispatch(action);
    },[dispatch])

    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(id, isDone, todolistId);
        dispatch(action);
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) =>{
        const action = changeTaskTitleAC(id, newTitle, todolistId);
        dispatch(action);
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, [dispatch])

    const removeTodolist = useCallback((id: string) => {
        const action = removeTodolistAC(id);
        dispatch(action);
    }, [dispatch])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        const action = changeTodolistTitleAC(id, title);
        dispatch(action);
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    }, [dispatch])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    <Button color={"inherit"} variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {
                        todoLists.map(tl => {
                            return <Grid item key={tl.id} color={"primary"}>
                                <Paper style={{padding: "10px", backgroundColor: "#ffd54f"}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasks[tl.id]}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
