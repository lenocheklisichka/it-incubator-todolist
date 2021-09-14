import React, {useCallback} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTasksAC, changeTaskStatusAC, changeTaskTitleAC, removeTasksAC} from "./state/tasks-reducer";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import { AppRootStateType} from "./state/store";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed";

function AppWithRedux() {
    const dispatch = useDispatch();
    const todolist = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todoLists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const removeTasks = useCallback((taskID: string, todoListID: string) => {
        const action = removeTasksAC(taskID, todoListID);
        dispatch(action);
    }, [dispatch])

    const addTask = useCallback((title: string, todoListID: string) => {
        const action = addTasksAC(title, todoListID);
        dispatch(action);
    }, [dispatch])

    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => {
        const action = changeTaskStatusAC(taskID, isDone, todoListID);
        dispatch(action)
    }, [dispatch])

    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        const action = changeTaskTitleAC(taskID, title, todoListID);
        dispatch(action)
    }, [dispatch])

    const changeTodoListFilter = useCallback((filterValue: FilterValuesType, todoListID: string) => {
        const action = changeTodoListFilterAC(todoListID, filterValue);
        dispatch(action);
    }, [dispatch])

    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        const action = changeTodoListTitleAC(title, todoListID);
        dispatch(action);
    }, [dispatch])

    const removeTodoList = useCallback((todoListID: string) => {
        const action = removeTodoListAC(todoListID);
        dispatch(action);
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        const action = addTodoListAC(title);
        dispatch(action);
    }, [dispatch])

    const todoListComponents = todolist.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={5} style={{padding: "20px", marginTop: "50px",  border: "1px solid blue"}}>
                    <TodoList
                        key={tl.id}
                        todoListID={tl.id}
                        title={tl.title}
                        removeTasks={removeTasks}
                        removeTodoList={removeTodoList}
                        tasks={tasks[tl.id]}
                        changeTodoListFilter={changeTodoListFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position={"static"}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton color={"inherit"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        TodoLists
                    </Typography>
                    <Button
                        color={"inherit"}
                        variant={"outlined"}
                    >Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux;