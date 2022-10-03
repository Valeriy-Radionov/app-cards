import React from 'react';
import {ModalWindow} from "../../../../common/components/modalWindows/ModalWindow";
import {deletePacksTC} from "../../../../bll/packsReducer";
import {useAppDispatch, useAppSelector} from "../../../../bll/store";
import del from "../../../../assets/image/Delete.svg";

type DeletePackModalPropsType = {
    packId: string
}

export const DeletePackModal: React.FC<DeletePackModalPropsType> = ({packId}) => {
    // Создавай файл со стилями в своих папках для каждой компоненты, не используй один файл на несколько компонент!!!
    const dispatch = useAppDispatch
    const status = useAppSelector(state => state.app.status)
    const styleDisable = status === "loading" ? {opacity: "0.5"} : {}


    const deletePack = () => {
        dispatch(deletePacksTC(packId))
    }

    return (
        <div style={{display: 'inline-block'}}>
            <ModalWindow namePreviousBtn={<img src={del} alt={''} style={styleDisable}/>}
                         titleModal={'Delete pack'}
                         actionSaveDeleteBtn={deletePack}
                         isSaveDeleteModal={"Delete"}
            >
                <span>Delete pack</span>
            </ModalWindow>
        </div>
    );
};

