import React, {ChangeEvent} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {DeleteSweep} from "@material-ui/icons";
import {TaskType} from "./App";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {changeTaskStatusAC, changeTaskTitleAC, removeTasksAC} from "./state/tasks-reducer";

export type Tasks1PropsType = {
    taskID: string
    todoListID: string
}

export const Task1 = React.memo((props: Tasks1PropsType) => {
    console.log("Task")
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[props.todoListID].filter(task => task.id === props.taskID)[0])
    const dispatch = useDispatch();
    const removeTask = () => dispatch(removeTasksAC(props.taskID, props.todoListID))
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(props.taskID, e.currentTarget.checked, props.todoListID))
    const changeTaskTitle = (title: string) => dispatch(changeTaskTitleAC(props.taskID, title, props.todoListID))
    return (
    <li style={{listStyle: "none", padding: "0px"}} key={task.id}>
                                <span className={task.isDone ? "is-done" : ""}>
                                    <Checkbox color={"primary"}
                                              checked={task.isDone}
                                              onChange={changeTaskStatus}/>
                                    <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                                </span>
        <IconButton onClick={removeTask} color={"secondary"}>
            <DeleteSweep/>
        </IconButton>
    </li>
    )
})