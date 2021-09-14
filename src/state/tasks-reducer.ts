import { TasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";

type RemoveTasksAT = {
    type: "REMOVE-TASKS"
    todoListID: string
    taskID: string
}

type AddTasksAT = {
    type: "ADD-TASKS"
    title: string
    todoListID: string
}

type ChangeTaskStatusAT = {
    type: "CHANGE-TASKS-STATUS",
    taskID: string,
    isDone: boolean,
    todoListID: string,
}

type ChangeTaskTitleAT = {
    type: "CHANGE-TASKS-TITLE",
    todoListID: string,
    title: string
}

export type ActionType = RemoveTasksAT | AddTasksAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodoListAT | RemoveTodoListAT;

let todolistID_1 = v1();
let todolistID_2 = v1();

const initialState: TasksStateType = {
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
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASKS":
            let copyState = {...state}
            copyState[action.todoListID]= copyState[action.todoListID].filter(t => t.id !== action.taskID)
            return copyState;
        case "ADD-TASKS":
            const newTask: TaskType = {
            id: v1(),
            title: action.title,
            isDone: false
        }
            return {
                ...state,
                [action.todoListID] : [newTask, ...state[action.todoListID]]
            }
        case "CHANGE-TASKS-STATUS":
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskID ? {...t, isDone: action.isDone } : t)
            }
        case "CHANGE-TASKS-TITLE":
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(t => t.id === action.title ? {...t, title: action.title } : t)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolistId]: []
            }
        case "REMOVE-TODOLIST": {
                let copyState = {...state}
                delete copyState[action.todoListID];
                return copyState
            }
        default:
            return state;
    }
}

export const removeTasksAC = (taskID: string, todoListID: string): RemoveTasksAT => {
    return  {
        type: "REMOVE-TASKS",
        taskID,
        todoListID
    }
}

export const addTasksAC = ( title: string, todoListID: string): AddTasksAT => {
    return {
        type: "ADD-TASKS",
        title,
        todoListID,
    }
}

export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): ChangeTaskStatusAT => {
    return {
        type: "CHANGE-TASKS-STATUS",
        todoListID,
        taskID,
        isDone
    }
}

export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): ChangeTaskTitleAT => {
    return {
        type: "CHANGE-TASKS-TITLE",
        title,
        todoListID,
    }
}