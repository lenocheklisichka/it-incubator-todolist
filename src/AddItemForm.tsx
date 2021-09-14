import React, {ChangeEvent, useState} from "react";
import { IconButton, TextField} from "@material-ui/core";
import {LibraryAdd} from "@material-ui/icons";

 type AddItemFormPropsType = {
    addItem: (title: string) => void,
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {// компонента по добавлению todoLists
    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<boolean>(false)
    const errorMessage =
        error ? <div style={{color: "red"}}>Title is required</div> : null

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false) // сетаем ошибку на false
    }
    const onKeyPressAddItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickAddItem()
        }
    }
    const onClickAddItem = () => {
        const validatedTitle = title.trim() // функция валидирует title, обрезает пробелы
        if (validatedTitle) {  // и если валидация прошла успешно, т. е. если не равна пустой строке
            props.addItem(validatedTitle) // то в пропсах ожидаем функцию и в ней передаем валидированное значение, создали ссылку на функцию
        } else {
            setError(true) // иначе выдает ошибку
        }
        setTitle(" ")
    }

    return (
        <div>
            <TextField
                variant={"outlined"}
                size={"small"}
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressAddItem}
                label={"Title"}
                error={error}
                helperText={errorMessage}
            />
            <IconButton onClick={onClickAddItem}  style={{color: "green"}}>
                <LibraryAdd/>
            </IconButton>
        </div>
    )
})