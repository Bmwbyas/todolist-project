import React from 'react';

import {ComponentMeta, ComponentStory} from "@storybook/react";

import App from "./App";
import {Provider} from "react-redux";
import {store} from "./store";
import {ReduxStoreProviderDecorator} from "../ReduxStoreProviderDecorator";


export default {
    title: 'App',
    component: App,
    argTypes:{
    },
    decorators:[ReduxStoreProviderDecorator]

} as ComponentMeta<typeof App>;


//👇 We create a “template” of how args map to rendering
const Template:ComponentStory<typeof App> = (args) =><App demo={true} /> ;

// 👇 Each story then reuses that template
export const AppWithReduxStories = Template.bind({});



