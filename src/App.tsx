import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

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
        {id: todolistID_1, title: "What to learn", filter: "active"},
        {id: todolistID_2, title: "What to by", filter: "completed"}
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistID_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ],
        [todolistID_2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Meat", isDone: false},
        ],
    })

    // const [tasks, setTasks] = useState<Array<TaskType>>([
    //         {id: v1(), title: "HTML", isDone: true},
    //         {id: v1(), title: "CSS", isDone: true},
    //         {id: v1(), title: "React", isDone: false},
    //         {id: v1(), title: "Redux", isDone: false}
    //     ]
    // )
    // const [filter, setFilter] = useState<FilterValuesType>("all");

    function changeTodoListFilter(filterValue: FilterValuesType, todoListID: string) {
        setTodolist(todolist.map(tl => tl.id === todoListID ? {...tl, filter: filterValue} : tl))
    }

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
        // const newTasks = [newTask, ...tasks]
        // setTasks(newTasks)
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        //                находим все эл массива по taskID
        const copyTasks = {...tasks}
        copyTasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone} : t)
        setTasks(copyTasks)
    }

    function removeTodolist(todoListID: string) {
        setTodolist(todolist.filter(tl => tl.id !== todoListID))
        const copyTasks = {...tasks}
        delete tasks[todoListID]
        setTasks(copyTasks)
    }

    function getFilteredTasks(tl: TodolistType) {
        debugger
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
            <TodoList
                key={tl.id}
                todoListID={tl.id}
                title={tl.title}
                removeTasks={removeTasks}
                removeTodolist={removeTodolist}
                tasks={taskForTodoList}
                changeTodoListFilter={changeTodoListFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={tl.filter}
            />
        )
    })

    return (
        <div className="App">
            {todoListComponents}
        </div>
    )
}

export default App;
