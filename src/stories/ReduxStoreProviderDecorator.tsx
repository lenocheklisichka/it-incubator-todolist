import React from "react";
import {AppRootStateType} from "../state/store";
import {Provider} from "react-redux";
import {tasksReducer} from "../state/tasks-reducer";
import {combineReducers, createStore} from "redux";
import {todoListsReducer} from "../state/todolists-reducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

const initialState = {
    todoLists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ],
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: () => any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}