import React, {ChangeEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";

type PropsTodoListType = {
    title: string;
    tasks: Array<TaskType>;
    filter: FilterValuesType
    removeTasks: (taskID: string) => void
    changeTodoListFilter: (filterValue: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
}

function TodoList(props: PropsTodoListType) {
    // const {title, tasks, filter, removeTask, addTask, changeTodoListFilter} = props
    const tasksJSXElements = props.tasks.map(t => {

        let taskClass = t.isDone ? "is-done" : "";

        const removeTask = () => props.removeTasks(t.id)
        return (
            <li key={t.id}>
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={(e) =>
                           props.changeTaskStatus(t.id, e.currentTarget.checked )}
                />
                <span className={taskClass}>{t.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        )
    });

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const onClickAddTask = () => {
        const validatedTitle = title.trim()
        if(validatedTitle) {
            props.addTask(validatedTitle)
        }
        else {
            setError(true)
        }
        setTitle(" ")
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onKeyPressAddTasks = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickAddTask()
        }
    }
    const errorMessage =
        error ? <div style={{color: "red"}}>Title is required</div> : null

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeTitle}
                    onKeyPress={onKeyPressAddTasks}
                    className={ error ? "error" : ""}
                />
                <button onClick={onClickAddTask}>+</button>
                {errorMessage}
            </div>
            <ul>
                {tasksJSXElements}
                {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[1].isDone}/> <span></span>{props.tasks[1].title}</li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "active-filter" : "" }
                    onClick={() => props.changeTodoListFilter("all")}>All</button>
                <button
                    className={props.filter === "active" ? "active-filter" : "" }
                    onClick={() => props.changeTodoListFilter("active")}>Active</button>
                <button
                    className={props.filter === "completed" ? "active-filter" : "" }
                    onClick={() => props.changeTodoListFilter("completed")}>Completed</button>
            </div>
        </div>
    );
}

export default TodoList;