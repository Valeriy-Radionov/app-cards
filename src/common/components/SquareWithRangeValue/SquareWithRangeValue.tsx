import React from 'react';
import style from './SquareWithRangeValue.module.css'

export const SquareWithRangeValue = ({value}: {value: number}) => {
    return (
        <div className={style.container}>
            <div className={style.content}>{value}</div>
        </div>
    );
};