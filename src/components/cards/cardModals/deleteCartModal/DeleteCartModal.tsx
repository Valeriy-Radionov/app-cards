import React from 'react';
import {ModalWindow} from "../../../../common/components/modalWindows/ModalWindow";
import {useAppDispatch} from "../../../../bll/store";
import del from "../../../../assets/image/Delete.svg";
import {deleteCardsTC} from "../../../../bll/cardsReducer";
import s from './DeleteCartModal.module.scss'

type DeleteCardModalPropsType = {
    cardId: string
    isDisabled: boolean
}

export const DeleteCardModal: React.FC<DeleteCardModalPropsType> = ({cardId}) => {
    const dispatch = useAppDispatch

    const deleteCard = () => {
        dispatch(deleteCardsTC(cardId))
    }

    return (
        <div style={{display: 'inline-block'}}>
            <ModalWindow namePreviousBtn={<img src={del} alt={''}/>}
                         titleModal={'Delete pack'}
                         actionSaveDeleteBtn={deleteCard}
                         isSaveDeleteModal={"Delete"}
            >
                <div className={s.block}>
                    <span>Do you really want to remove Card Name? </span>
                    <span>All cards will be deleted.</span>
                </div>
            </ModalWindow>
        </div>
    );
};

