import React, {ChangeEvent, useState} from 'react';
import {UpdateUserType} from "../../../api/auth/auth-api";

type EditableSpanPropsType = {
    name: string
    class?: string
    changeTask: (model:UpdateUserType) => void
    disabled?: boolean
}

const ProfileRename: React.FC<EditableSpanPropsType> = ({name, changeTask, disabled}) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(name)
    }
    const activateViewMode = () => {
        setEditMode(false)
        changeTask({name: title})
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        <div>
            {editMode
                ?
                <>
                    <input
                        value={title}
                        onChange={changeTitle}
                        disabled={disabled}
                        autoFocus
                    />
                    <button onClick={activateViewMode}>SAVE</button>
                </>
                : <span onDoubleClick={activateEditMode}>{name}</span>}
        </div>
    );
};

export default ProfileRename;