import React from 'react';
import stylePacks from "../../Packs.module.scss"
import styleModal from "./AddPackModal.module.scss"
import {ModalWindow} from "../../../../common/modalWindows/ModalWindow";
import closeBtn from "../../../../common/image/Page 1close.svg"
import {BlockButtonModal} from "../BlockButtonModal";

export const AddPackModal = () => {

    const [open, setOpen] = React.useState<boolean>(false);

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const addPack = () => {

    }

    const styleActionBtn = ""
    return (
        <ModalWindow styleButton={stylePacks.btnPack} nameButton={"Add new pack"} open={open}
                     handleOpen={handleOpen} handleClose={handleClose}>
            <div className={styleModal.header}>
                <span className={styleModal.title}>Add new pack</span>
                <button className={styleModal.close} onClick={handleClose}><img src={closeBtn} alt={"X"}/></button>
            </div>
            <div className={styleModal.addPackBlock}>
                <span className={styleModal.titleBlock}>Name pack</span>
                <input className={styleModal.InputBlock}/>
                <div className={styleModal.selectionBlock}>
                    <input type={"checkbox"} className={styleModal.checkbox}/>
                    <label className={styleModal.description}>Private pack</label>
                </div>
                <BlockButtonModal nameAction={"Save"} nameClose={"Close"} handleClose={handleClose}
                                  actionHandler={addPack}/>
            </div>
        </ModalWindow>

    );
};

