import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    todoListID: string
}

type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
}

type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER",
    todoListID: string,
    filter: FilterValuesType
}

type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE",
    todoListID: string,
    title: string
}

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListFilterAT | ChangeTodoListTitleAT

export const todoListsReducer = (todoList: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoList.filter((tl => tl.id !== action.todoListID))
        case "ADD-TODOLIST":
            const newTodoListID = v1();
            const newTodoList: TodolistType = {
                id: newTodoListID,
                title: action.title,
                filter: "all"
            }
            return [...todoList, newTodoList]
        case "CHANGE-TODOLIST-FILTER":
           return  todoList.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl)
        case "CHANGE-TODOLIST-TITLE":
           return todoList.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
        default:
            return todoList;
    }
}

export const RemoveTodoListAC = (todoListID: string): RemoveTodoListAT => {
    return  {
        type: "REMOVE-TODOLIST",
        todoListID,
    }
}

export const AddTodoListAC = ( title: string): AddTodoListAT => {
    return {
        type: "ADD-TODOLIST",
        title,
    }
}

export const ChangeTodoListFilterAC = (todoListID: string, filter: FilterValuesType): ChangeTodoListFilterAT => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        todoListID,
        filter,
    }
}

export const ChangeTodoListTitleAC = (title: string, todoListID: string, ): ChangeTodoListTitleAT => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        title: title,
        todoListID: todoListID,
    }
}