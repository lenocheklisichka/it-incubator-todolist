import React, {useReducer} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTasksAC, changeTaskStatusAC, changeTaskTitleAC, removeTasksAC, tasksReducer} from "./state/tasks-reducer";
import {addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC, todoListsReducer} from "./state/todolists-reducer";

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

 type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed";

function AppWithReducers() {
    const todolistID_1 = v1();
    const todolistID_2 = v1();

    let [todolist, dispatchToTodoListsReducer] = useReducer(todoListsReducer, [
        {id: todolistID_1, title: "What to learn", filter: "all"},
        {id: todolistID_2, title: "What to buy", filter: "all"},
    ])
    const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer,{
        [todolistID_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "REACT", isDone: false},
            {id: v1(), title: "REDUX", isDone: false}
        ],
        [todolistID_2]: [
            {id: v1(), title: "BREAD", isDone: false},
            {id: v1(), title: "MILK", isDone: false},
            {id: v1(), title: "WINE", isDone: true},
            {id: v1(), title: "JUICE", isDone: true},
        ],
    })

    function removeTasks(taskID: string, todoListID: string) {
        const action = removeTasksAC(taskID, todoListID);
        dispatchToTasksReducer(action);
    }

    function addTask(title: string, todoListID: string) {
        const action = addTasksAC(title, todoListID);
        dispatchToTasksReducer(action);
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        const action = changeTaskStatusAC(taskID, isDone, todoListID);
        dispatchToTasksReducer(action)
    }

    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        const action = changeTaskTitleAC(taskID, title, todoListID);
        dispatchToTasksReducer(action)
    }

    function changeTodoListFilter(filterValue: FilterValuesType, todoListID: string) {
        const action = changeTodoListFilterAC(todoListID, filterValue);
        dispatchToTodoListsReducer(action);
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        const action = changeTodoListTitleAC(title, todoListID);
        dispatchToTodoListsReducer(action);
    }

    function removeTodoList(todoListID: string) {
        const action = removeTodoListAC(todoListID);
        dispatchToTodoListsReducer(action);
        dispatchToTasksReducer(action);
    }

    function addTodoList(title: string) {
        const action = addTodoListAC(title);
        dispatchToTasksReducer(action);
        dispatchToTodoListsReducer(action);
    }

    function getFilteredTasks(tl: TodolistType) {
        switch (tl.filter) {
            case "active":
                return tasks[tl.id].filter(t => !t.isDone)
            case "completed":
                return tasks[tl.id].filter(t => t.isDone)
            default:
                return tasks[tl.id]
        }
    }

    const todoListComponents = todolist.map(tl => {
        const taskForTodoList = getFilteredTasks(tl)
        return (
            <Grid item key={tl.id}>
                <Paper elevation={5} style={{padding: "20px", marginTop: "50px",  border: "1px solid blue"}}>
                    <TodoList
                        key={tl.id}
                        todoListID={tl.id}
                        title={tl.title}
                        removeTasks={removeTasks}
                        removeTodoList={removeTodoList}
                        tasks={taskForTodoList}
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

export default AppWithReducers;