import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete, DeleteSweep} from "@material-ui/icons";

type PropsTodoListType = {
    todoListID: string;
    title: string;
    tasks: Array<TaskType>;
    filter: FilterValuesType;
    removeTasks: (taskID: string, todoListID: string) => void;
    removeTodoList: (todoListID: string) => void;
    changeTodoListFilter: (filterValue: FilterValuesType, todoListID: string) => void;
    addTask: (title: string, todoListID: string) => void;
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void;
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void;
    changeTodoListTitle: (title: string, todoListID: string) => void;
}

function TodoList(props: PropsTodoListType) {
    const tasksJSXElements = props.tasks.map(t => {
        let taskClass = t.isDone ? "is-done" : "";
        const removeTask = () => props.removeTasks(t.id, props.todoListID)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
        const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todoListID)

        return (
            <li style={{listStyle: "none", padding: "0px"}} key={t.id} >
                <span className={taskClass}>
                    <Checkbox
                        color={"primary"}
                        checked={t.isDone}
                        onChange={changeTaskStatus}
                    />
                    <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                </span>
                <IconButton onClick={removeTask} color={"secondary"}>
                    <DeleteSweep/>
                </IconButton>
            </li>
        )
    });

    const addTask = (title: string) => { // получили какую-то строку
        props.addTask(title, props.todoListID) // TodoList внутри себя добавляет таски
    }

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListID)
    }

    return (
        <div>
            <h3 style={{color: "blue"}}>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={() => props.removeTodoList(props.todoListID)}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/> {/*перенесли компоненту в TodoList и функцию добавления тасок*/}
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                <Button
                    size={"small"}
                    variant={props.filter === "all" ? "contained" : "text"}
                    onClick={() => props.changeTodoListFilter("all", props.todoListID)}>All
                </Button>
                <Button color={"primary"} size={"small"}
                        variant={props.filter === "active" ? "contained" : "text"}
                        onClick={() => props.changeTodoListFilter("active", props.todoListID)}>Active
                </Button>
                <Button
                    color={"secondary"}
                    size={"small"}
                    className={props.filter === "completed" ? "contained" : "text"}
                    onClick={() => props.changeTodoListFilter("completed", props.todoListID)}>Completed
                </Button>
            </div>
        </div>
    );
}

export default TodoList;