import React from "react"
import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Todolist/AddItemForm',
    component: AddItemForm,
    }

export function AddItemFormBaseExample(){
    return <AddItemForm addItem={action('Click')}/>
}