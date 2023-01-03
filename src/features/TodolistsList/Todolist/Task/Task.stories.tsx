import React from 'react';
import {Task} from "./Task";

import {action} from "@storybook/addon-actions";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {TaskStatuses} from "../../../../api/todolist-api";
import {ReduxStoreProviderDecorator} from "../../../../ReduxStoreProviderDecorator";


export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: 'Todolist/Task',
    component: Task,
    decorators:[ReduxStoreProviderDecorator],
    argTypes:{


    },

} as ComponentMeta<typeof Task>;


//👇 We create a “template” of how args map to rendering
const Template:ComponentStory<typeof Task> = (args) => <Task {...args} />;

// 👇 Each story then reuses that template
export const TaskStories = Template.bind({});
TaskStories.args = {

    task: {id:'sdfsdf',title:'js',status:TaskStatuses.Completed,description: 'string',completed: false,
        priority: 0,startDate: new Date(),deadline: new Date(),
        todoListId: "todolistId1",order: 0,addedDate:' ' ,entityStatus:'idle'},
    todolistId: 'string',


};


