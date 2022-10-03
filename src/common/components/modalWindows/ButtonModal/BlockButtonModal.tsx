import React from 'react';
import style from "./BlockButton.module.scss";


export type ButtonActionBlockType = "save" | "delete"

type BlockButtonModalType = {
    typeAction: ButtonActionBlockType
    nameAction: string
    nameClose: string
    handleClose: (isToggle: boolean) => void
    actionHandler: () => void
}
export const BlockButtonModal: React.FC<BlockButtonModalType> = ({
                                                                     handleClose,
                                                                     actionHandler,
                                                                     nameAction,
                                                                     nameClose, typeAction
                                                                 }) => {

    const onCloseHandler = () => {
        handleClose(false)
    }
    const onActionHandler = () => {
        actionHandler()
        handleClose(false)
    }
    return (
        <div className={style.buttonBlock}>
            <button className={style.close}
                    onClick={onCloseHandler}>{nameClose}
            </button>
            {typeAction === "save" ?
                <button className={style.defaultBtn}
                        onClick={onActionHandler}>{nameAction}</button> :
                <button className={style.deleteBtn}
                        onClick={onActionHandler}>{nameAction}</button>
            }
        </div>
    );
};

