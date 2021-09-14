import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import EditableSpan from "./EditableSpan";

export default {
    title: 'TODOLIST/EditableSpan',
    component: EditableSpan,
    argTypes: {
        changeTitle: { description: 'value EditableSpan changed'},
    },
    titleValue: {
        defaultValue: 'HTML',
        description: 'start value EditableSpan'
    }
} as ComponentMeta<typeof EditableSpan>;

const EditableSpanTemplate: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStory = EditableSpanTemplate.bind({});
EditableSpanStory.args = {
    changeTitle: action('value EditableSpan changed'),
};
