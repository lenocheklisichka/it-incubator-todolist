import React from "react";
import {Task} from "./Task";
import {action} from "@storybook/addon-actions";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
    title: 'TODOLIST/Task',
    component: Task,
    args: {
        changeTaskStatus: action('changeTaskStatusCallback'),
        changeTaskTitle: action('changeTaskTitleCallback'),
        removeTask: action('removeTaskCallback')
    }
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>;

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    task: {id: '1', isDone: true, title: 'JS'},
};

export const TaskIsNotExample = Template.bind({});
TaskIsNotExample.args = {
    task: {id: '1', isDone: false, title: 'JS'},

};