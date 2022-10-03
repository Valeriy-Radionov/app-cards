import React from 'react';
import style from "./BlockButton.module.scss";


type BlockButtonModalType = {
    isSaveDeleteModal: 'Save' | 'Delete'
    toggleModal: () => void
    actionSaveDeleteBtn: () => void
}
export const BlockButtonModal: React.FC<BlockButtonModalType> = ({
                                                                     toggleModal,
                                                                     actionSaveDeleteBtn,
                                                                     isSaveDeleteModal,
                                                                 }) => {

    const onCloseHandler = () => {
        toggleModal()
    }
    const onActionHandler = () => {
        actionSaveDeleteBtn()
        toggleModal()
    }
    return (
        <div className={style.buttonBlock}>
            <button className={style.close} onClick={onCloseHandler}>Cancel</button>

            <button className={style.defaultBtn} onClick={onActionHandler}>{isSaveDeleteModal}</button>
        </div>
    );
};

