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

    const styleButton = isSaveDeleteModal === 'Delete'? style.deleteBtn : style.defaultBtn

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
            <button className={ styleButton} onClick={onActionHandler}>{isSaveDeleteModal}</button>
        </div>
    );
};

