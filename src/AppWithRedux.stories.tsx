import React from "react";
import {Task, TaskPropsType} from "./Task";
import {action} from "@storybook/addon-actions";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";

export default {
    title: 'TODOLIST/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>;

const Template: ComponentStory<typeof AppWithRedux> = (args) =><Provider store={store}><AppWithRedux /></Provider> ;

export const AppWithReduxStories = Template.bind({});