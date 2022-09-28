import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react';
import style from './InputSearch.module.css'
import searchIcon from './Union.png'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>


type SuperInputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
}

export const InputSearch: React.FC<SuperInputTextPropsType> = (
    {
        type,
        onChangeText,
        onChange,
        ...restProps
    }
) => {
    const onChangeCallBack = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeText && onChangeText(e.currentTarget.value)
        onChange && onChange(e)
    }
    return (
        <div className={style.container}>
            <div className={style.content}>
                <div className={style.imgContainer}>
                    <img src={searchIcon} alt="search img"/>
                </div>
                <input
                    type="text"
                    placeholder={'Provide your text'}
                    onChange={onChangeCallBack}
                    {...restProps}
                />
            </div>
        </div>
    );
};