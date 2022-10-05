import React from 'react';
import {ModalWindow} from "../../../../common/components/modalWindows/ModalWindow";
import {deletePacksTC} from "../../../../bll/packsReducer";
import {useAppDispatch, useAppSelector} from "../../../../bll/store";
import del from "../../../../assets/image/Delete.svg";
import style from "./DeletePack.module.scss"

type DeletePackModalPropsType = {
    packId: string
    packName: string
}

export const DeletePackModal: React.FC<DeletePackModalPropsType> = ({packId, packName}) => {

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
                <div className={style.descriptionBlock}>
                    <span>{`Do you really want to remove `}<b>{packName}</b>?</span>
                    <span>All cards will be deleted.</span>
                </div>
            </ModalWindow>
        </div>
    );
};

