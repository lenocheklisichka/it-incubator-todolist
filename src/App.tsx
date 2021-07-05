import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    MenuList, Paper,
    Toolbar,
    Typography
} from "@material-ui/core";

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

function App() {
    const todolistID_1 = v1();
    const todolistID_2 = v1();

    let [todolist, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistID_1, title: "What to learn", filter: "all"},
        {id: todolistID_2, title: "What to buy", filter: "all"},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
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
        const copyTasks = {...tasks}
        copyTasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks(copyTasks)
    }

    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        }
        const copyTasks = {...tasks}
        copyTasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks(copyTasks)
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        //                находим все эл массива по taskID
        const copyTasks = {...tasks}
        copyTasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone} : t)
        setTasks(copyTasks)
    }

    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        const copyTasks = {...tasks}
        copyTasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, title} : t)
        setTasks(copyTasks)
    }

    function changeTodoListFilter(filterValue: FilterValuesType, todoListID: string) {
        setTodolist(todolist.map(tl => tl.id === todoListID ? {...tl, filter: filterValue} : tl))
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        setTodolist(todolist.map(tl => tl.id === todoListID ? {...tl, title: title} : tl))
    }

    function removeTodoList(todoListID: string) {
        setTodolist(todolist.filter(tl => tl.id !== todoListID))
        const copyTasks = {...tasks}
        delete tasks[todoListID]
        setTasks(copyTasks)
    }

    function addTodoList(title: string) {
        const newTodoListID = v1();
        const newTodoList: TodolistType = {
            id: newTodoListID,
            title,
            filter: "all"// создали новый todoList
        }
        setTodolist([...todolist, newTodoList]) //вызвали функцию setT., передали в неё новый массив, в новый массив положили содержимое массива
        // todoLists, получили копию массива todoLists и в конец добавили новый todoList
        setTasks({...tasks, [newTodoListID]: []}) // создали новый объект, туда положили все таски которые были, создали новое
        // свойство newTodoListID, а значением этого свойства пока будет пустой массив
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
                <Paper elevation={5} style={{padding: "20px"}}>
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
                        <MenuList/>
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

export default App;