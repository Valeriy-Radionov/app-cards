import React from 'react';
import s from './ActionsCardTable.module.scss'
import stroke from "../../../../assets/image/Edit.svg";
import del from "../../../../assets/image/Delete.svg";
import {DeleteCardModal} from "../../cardModals/deleteCartModal/DeleteCartModal";

type ActionsCardTablePropsType = {
    id: string
    isMy: boolean
    isDisabled: boolean
}
export const ActionsCardTable: React.FC<ActionsCardTablePropsType> = ({ id, isMy, isDisabled}) => {
    return (
        isMy
            ?
            <div className={s.block} style={isDisabled ? {opacity: '0.5'} : {}}>
                <button onClick={() => {}}
                        className={s.btn}
                        disabled={isDisabled}
                >
                    <img src={stroke} alt={''}/>
                </button>
                <DeleteCardModal cardId={id} isDisabled={isDisabled}/>
            </div>
            :
            null
    );
};

