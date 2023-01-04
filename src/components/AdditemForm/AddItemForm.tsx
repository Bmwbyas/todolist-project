import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';

type AddItemFormPropsType = {
    addItem: (param:{title: string}) => void
    disabled?:boolean
}

export const AddItemForm = React.memo( (props: AddItemFormPropsType) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem({title});
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.key === 'Enter') {
            addItem();
        }
    }

    return <div>
        <TextField variant="outlined"
                   disabled={props.disabled}
                   error={!!error}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
                   label="Title"
                   helperText={error}
        />
        <IconButton disabled={props.disabled} color="primary" onClick={addItem}>
            <AddBox />
        </IconButton>
    </div>
} );
