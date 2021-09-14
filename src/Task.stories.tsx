import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {v1} from "uuid";

const removeTasksCallback = action('RemoveTasks clicked')
const changeTaskStatusCallback = action('ChangeTaskStatus clicked')
const changeTaskTitleCallback = action('ChangeTaskTitle clicked')


export default {
    title: 'TODOLIST/Task',
    component: Task,
    args: {
        removeTasks: removeTasksCallback,
        changeTaskStatus: changeTaskStatusCallback,
        changeTaskTitle: changeTaskTitleCallback,
    }

} as ComponentMeta<typeof Task>;

const TaskTemplate: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = TaskTemplate.bind({});
TaskIsDoneStory.args = {
    task: {id: v1(), title: "REACT", isDone: true},
    todoListID: "todo1",
};

export const TaskIsNotDoneStory = TaskTemplate.bind({});
TaskIsNotDoneStory.args = {
    task: {id: v1(), title: "REACT", isDone: false},
    todoListID: "todo1",
};
