import React from "react";
import {action} from "@storybook/addon-actions";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {EditableSpan} from "./EditableSpan";


export default {
    title: 'TODOLIST/EditableSpan',
    component: EditableSpan,
    argsTypes: {
        onChange: {
            description: "Value EditableSpan changed"
        },
        value: {
            defaultValue: "HTML",
            description: "Start value EditableSpan"
        }
    }
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args}/>;

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    onChange: action("Value EditableSpan changed")
};