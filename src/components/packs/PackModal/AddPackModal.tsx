import React from 'react';
import stylePacks from "../Packs.module.scss"
import styleModal from "../PackModal/AddPackModal.module.scss"
import {ModalWindow} from "../../../common/modalWindows/ModalWindow";
import closeBtn from "../../../common/image/Page 1close.svg"

export const AddPackModal = () => {

    const [open, setOpen] = React.useState<boolean>(false);

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <ModalWindow styleButton={stylePacks.btnAddPack} nameButton={"Add new pack"} open={open}
                     handleOpen={handleOpen} handleClose={handleClose}>
            <div className={styleModal.container}>
                <div className={styleModal.header}>
                    <span className={styleModal.title}>Add new pack</span>
                    <button className={styleModal.close} onClick={handleClose}><img src={closeBtn} alt={"X"}/></button>
                </div>
            </div>
        </ModalWindow>

    );
};

