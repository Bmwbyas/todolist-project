import React from 'react';
import {action} from "@storybook/addon-actions";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {EditableSpan} from "./EditableSpan";


export default {
    title: 'Editablespan',
    component: EditableSpan,
    argTypes:{


    },

} as ComponentMeta<typeof EditableSpan>;


//👇 We create a “template” of how args map to rendering
const Template:ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

// 👇 Each story then reuses that template
export const EditableSpanStories = Template.bind({});
EditableSpanStories.args = {
    value: 'value',
    onChange: action('change value')
};


