import React from 'react';
import s from './ActionsCardTable.module.scss'
import stroke from "../../common/image/Edit.svg";
import del from "../../common/image/Delete.svg";

type ActionsCardTablePropsType = {
    deleteItem: (id: string) => void
    id: string
    isMy: boolean
}
export const ActionsCardTable: React.FC<ActionsCardTablePropsType> = ({deleteItem, id, isMy}) => {
    return (
        isMy
            ? <div className={s.block}>
                <button onClick={() => {
                }} className={s.btn}>
                    <img src={stroke} alt={''}/>
                </button>
                <button onClick={() => deleteItem(id)} className={s.btn}>
                    <img src={del} alt={''}/>
                </button>
            </div>
            : null
    );
};

