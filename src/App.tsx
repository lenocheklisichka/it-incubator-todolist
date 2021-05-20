import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type FilterValuesType = "all" | "active" | "completed";

function App() {
    console.log(v1())
    //Bll:
    const [tasks, setTasks] = useState<Array<TaskType>>([
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ]
    )
    const [filter, setFilter] = useState<FilterValuesType>("all");

    function changeTodoListFilter(filterValue: FilterValuesType) {
        setFilter(filterValue)
    }

    function removeTask(taskID: string) {
        const filteredTasks = tasks.filter(t => t.id !== taskID)
        console.log(filteredTasks)
        setTasks(filteredTasks)
        // if(filteredTasks !== tasks) {
        //     tasks = filteredTasks
        //     React.render()
        // }
    }

    function addTask(title: string) {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        }
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    function changeTaskStatus(taskID: string, isDone: boolean) {
        let updatedTask = tasks.map(t  => t.id === taskID ? { ...t, isDone} : t)
        setTasks(updatedTask)
    }

    // UI:
    function getFilteredTasks() {
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks

        }
    }

    // let taskForTodolist = tasks;
    // if(filter === "active") {
    //     taskForTodolist = tasks.filter(t => t.isDone)
    // }
    // if(filter === "completed") {
    //     taskForTodolist = tasks.filter(t => !t.isDone)
    // }


    return (
        <div className="App">
            <TodoList
                title={"What to learn"}
                removeTasks={removeTask}
                tasks={getFilteredTasks()}
                changeTodoListFilter={changeTodoListFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
