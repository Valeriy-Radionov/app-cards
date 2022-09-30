import React, {ChangeEvent} from 'react';
import {TextField} from "@mui/material";
import s from './InputSearch.module.scss'

type InputSearchPropsType = {
    inputId: string
    label: string
    sx: object
    name: string
    value: string | undefined
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    disabled: boolean
}
export const InputSearch: React.FC<InputSearchPropsType> = ({
                                                                inputId,
                                                                label,
                                                                sx,
                                                                name,
                                                                value,
                                                                onChange,
                                                                disabled
                                                            }) => {
    return (
        <div className={s.block}>
            <div className={s.name}>
                <span>{name}</span>
            </div>
            <TextField
                id={inputId}
                label={label}
                variant="outlined"
                sx={sx}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
        </div>
    );
};
