import React, {ReactNode} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styleModal from "./ModalWindow.module.scss";
import closeBtn from "../../../assets/image/Page 1close.svg";
import {BlockButtonModal} from "./ButtonModal/BlockButtonModal";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    padding: '0%',
    transform: 'translate(-50%, -50%)',
    width: 395,
    minHeight: 311,
    bgcolor: 'white',
    boxShadow: 24,
    p: 0,
    paddingBottom: 5
};
type ModalWindowType = {
    children: ReactNode
    actionSaveDeleteBtn: () => void
    titleModal: string
    namePreviousBtn: string | ReactNode
    isSaveDeleteModal: 'Save' | 'Delete'
}

export const ModalWindow: React.FC<ModalWindowType> = ({
                                                           children,
                                                           titleModal,
                                                           actionSaveDeleteBtn,
                                                           namePreviousBtn,
                                                           isSaveDeleteModal
                                                       }) => {
    const [open, setOpen] = React.useState<boolean>(false);
    const isSaveDelete = isSaveDeleteModal === 'Save'

    const clickToggleModal = () => {
        setOpen(!open)
    }



    return (
        <div className={styleModal.container}>
            <button onClick={clickToggleModal} className={isSaveDelete ? styleModal.btnPack : styleModal.btnDelete}>{namePreviousBtn}</button>
            <Modal
                open={open}
                onClose={clickToggleModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className={styleModal.header}>
                        <span className={styleModal.title}>{titleModal}</span>
                        <button className={styleModal.close} onClick={clickToggleModal}><img src={closeBtn} alt={"X"}/>
                        </button>
                    </div>
                    {children}
                    <BlockButtonModal isSaveDeleteModal={isSaveDeleteModal} toggleModal={clickToggleModal}
                                      actionSaveDeleteBtn={actionSaveDeleteBtn}/>
                </Box>
            </Modal>
        </div>
    );
}
