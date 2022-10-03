import React, {ChangeEvent, useState} from 'react';
import {UpdateUserType} from "../../../api/auth/auth-api";
import stroke from '../../../assets/image/Edit.svg'
import s from './ProfileReName.module.scss'

type EditableSpanPropsType = {
    name: string
    class?: string
    changeTask: (model: UpdateUserType) => void
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
        <div className={s.block}>
            {editMode
                ?
                <div className={s.inputBlock}>
                    <span className={s.nickname}>Nickname</span>
                    <div>
                        <input
                            value={title}
                            onChange={changeTitle}
                            disabled={disabled}
                            autoFocus
                        />
                        <button onClick={activateViewMode}>SAVE</button>
                    </div>
                </div>
                : <span onDoubleClick={activateEditMode}>{name} <img src={stroke} alt={''}/></span>}
        </div>
    );
};

export default ProfileRename;