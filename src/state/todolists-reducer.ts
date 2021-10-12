import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    todoListID: string
}

export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
}

export type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER",
    todoListID: string,
    filter: FilterValuesType
}

export type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE",
    todoListID: string,
    title: string
}

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListFilterAT | ChangeTodoListTitleAT

// export let todolistID_1 = v1()
// export let todolistID_2 = v1()
const initialState: Array<TodolistType>  = [
    // {id: todolistID_1, title: "What to learn", filter: "all"},
    // {id: todolistID_2, title: "What to buy", filter: "all"},
]

export const todoListsReducer = (todoList: Array<TodolistType> = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoList.filter((tl => tl.id !== action.todoListID))
        case "ADD-TODOLIST":
            const newTodoList: TodolistType = {
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }
            return [newTodoList, ...todoList]
        case "CHANGE-TODOLIST-FILTER":
            return todoList.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl)
        case "CHANGE-TODOLIST-TITLE":
            return todoList.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
        default:
            return todoList;
    }
}

export const removeTodoListAC = (todoListID: string): RemoveTodoListAT => {
    return {
        type: "REMOVE-TODOLIST",
        todoListID,
    }
}

export const addTodoListAC = (title: string): AddTodoListAT => {
    return {
        type: "ADD-TODOLIST",
        title,
        todolistId: v1()
    }
}

export const changeTodoListFilterAC = (todoListID: string, filter: string): ChangeTodoListFilterAT => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        todoListID,
        filter,
    } as ChangeTodoListFilterAT
}

export const changeTodoListTitleAC = (title: string, todoListID: string,): ChangeTodoListTitleAT => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        title: title,
        todoListID: todoListID,
    }
}