import React, {ChangeEvent} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {DeleteSweep} from "@material-ui/icons";
import {TaskType} from "./App";

export type TasksPropsType = {
    task: TaskType;
    removeTasks: (taskID: string) => void;
    changeTaskStatus: (taskID: string, isDone: boolean) => void;
    changeTaskTitle: (taskID: string, title: string) => void;
    todoListID: string
}

export const Task = React.memo((props: TasksPropsType) => {
    console.log("Task")
    const removeTask = () => props.removeTasks(props.task.id)
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.task.id, e.currentTarget.checked)
    const changeTaskTitle = (title: string) => props.changeTaskTitle(props.task.id, title)
    return (
    <li style={{listStyle: "none", padding: "0px"}} key={props.task.id}>
                                <span className={props.task.isDone ? "is-done" : ""}>
                                    <Checkbox color={"primary"}
                                              checked={props.task.isDone}
                                              onChange={changeTaskStatus}/>
                                    <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>
                                </span>
        <IconButton onClick={removeTask} color={"secondary"}>
            <DeleteSweep/>
        </IconButton>
    </li>
    )
})