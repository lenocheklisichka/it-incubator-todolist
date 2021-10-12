import React, {useCallback} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {AddShoppingCart} from "@material-ui/icons";
import {Task1} from "./Task1";

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

const TodoList = React.memo((props: PropsTodoListType) => {
        const addTask = useCallback((title: string) => { // получили какую-то строку
            props.addTask(title, props.todoListID) // TodoList внутри себя добавляет таски
        }, [props.todoListID, props.addTask])
        const changeTodoListTitle = (title: string) => {
            props.changeTodoListTitle(title, props.todoListID)
        }
        const removeTodoList = () => props.removeTodoList(props.todoListID)

        const onClickAllHandler = () => props.changeTodoListFilter("all", props.todoListID)
        const onClickActiveHandler = () => props.changeTodoListFilter("active", props.todoListID)
        const onClickCompletedHandler = () => props.changeTodoListFilter("completed", props.todoListID)

        const allTaskForTodoList = props.tasks
        if (props.filter === "active") {
            allTaskForTodoList.filter(t => !t.isDone)
        }
        if (props.filter === "completed") {
            allTaskForTodoList.filter(t => t.isDone)
        }

        // const removeTask = useCallback((taskID: string) => {
        //     props.removeTasks(taskID, props.todoListID)
        // }, [props.removeTasks, props.todoListID])
        // const changeTaskStatus = useCallback((taskID: string, newIsDoneValue: boolean) => {
        //     props.changeTaskStatus(taskID, newIsDoneValue, props.todoListID)
        // }, [props.changeTaskStatus, props.todoListID])
        // const changeTaskTitle = useCallback((taskID: string, title: string) => {
        //     props.changeTaskTitle(taskID, title, props.todoListID)
        // }, [props.changeTaskTitle, props.todoListID])

        return (
            <div>
                <h3 style={{color: "blue"}}>
                    <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                    <IconButton onClick={removeTodoList} color="secondary" aria-label="add to shopping cart">
                        <AddShoppingCart/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTask}/> {/*перенесли компоненту в TodoList и функцию добавления тасок*/}
                <ul>
                    {
                        allTaskForTodoList.map(t => {
                            return (
                                <Task1 key={t.id}
                                       taskID={t.id}
                                       todoListID={props.todoListID}
                                />
                            )
                        })
                    }
                </ul>
                <div>
                    <Button
                        size={"small"}
                        color={"primary"}
                        variant={props.filter === "all" ? "contained" : "outlined"}
                        onClick={onClickAllHandler}>All
                    </Button>
                    <Button color={"secondary"} size={"small"}
                            variant={props.filter === "active" ? "contained" : "outlined"}
                            style={{marginLeft: "5px"}}
                            onClick={onClickActiveHandler}>Active
                    </Button>
                    <Button
                        size={"small"}
                        style={{marginLeft: "5px"}}
                        className={props.filter === "completed" ? "contained" : "outlined"}
                        onClick={onClickCompletedHandler}>Completed
                    </Button>
                </div>
            </div>
        );
    }
)

export default TodoList;