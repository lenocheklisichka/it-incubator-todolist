import React from 'react';
import {AddItemForm, AddItemFormPropsType} from "./AddItemForm";
import {action} from '@storybook/addon-actions';
import {ComponentMeta, ComponentStory} from '@storybook/react';

export default {
    title: 'TODOLIST/AddItemForm',
    component: AddItemForm,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        addItem: { description: 'Button inside form clicked' },
    },
} as ComponentMeta<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const AddItemFormTemplate: ComponentStory<typeof AddItemForm> = (args: AddItemFormPropsType) => <AddItemForm {...args} />;

export const AddItemFormStories = AddItemFormTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AddItemFormStories.args = {
    addItem: action('Button inside form clicked')
};
