import React from 'react';
import style from "./BlockButton.module.scss";

type BlockButtonModalType = {
    nameAction: string
    nameClose: string
    handleClose: () => void
    actionHandler: () => void
}
export const BlockButtonModal: React.FC<BlockButtonModalType> = ({handleClose, actionHandler, nameAction}) => {
    return (
        <div className={style.buttonBlock}>
            <button className={style.close}
                    onClick={handleClose}>nameClose
            </button>
            <button className={style.btnPack}
                    onClick={actionHandler}>{nameAction}</button>
        </div>
    );
};

