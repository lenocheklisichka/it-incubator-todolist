import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";

export default {
    title: 'TODOLIST/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>;

const AppWithReduxTemplate: ComponentStory<typeof AppWithRedux> = (args) => <Provider store={store}><AppWithRedux/></Provider>;

export const AppWithReduxStory = AppWithReduxTemplate.bind({});
AppWithReduxStory.args = {
    addItem: action('Button clicked')
};
