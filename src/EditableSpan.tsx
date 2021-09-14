import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    title: string;
    changeTitle: (title: string) => void;
}

const EditableSpan = (props: EditableSpanPropsType) => {
    const [title, setTitle] = useState<string>(props.title)
    const [editMode, setEditMode] = useState<boolean>(false);

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onEnterEditOffMode = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            offEditMode()
        }
    }

    return (
        editMode ?
            <TextField
                autoFocus={true}
                value={title}
                onBlur={offEditMode}
                onChange={onChangeTitle}
                onKeyPress={onEnterEditOffMode}/> :
            <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}
export default EditableSpan;