import React, {ReactNode} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styleModal from "./ContentModal.module.scss";
import closeBtn from "../image/Page 1close.svg";
import {BlockButtonModal, ButtonActionBlockType} from "./ButtonModal/BlockButtonModal";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    padding: '0%',
    transform: 'translate(-50%, -50%)',
    width: 395,
    height: 311,
    bgcolor: 'white',
    boxShadow: 24,
    p: 0
};
type ModalWindowType = {
    children: ReactNode
    typeAction: ButtonActionBlockType // type for button save | delete <- update scss
    addPackHandler: () => void //
    styleButton?: string | undefined
    nameButton?: string | undefined
    open?: boolean
    title: string
    nameClose: string
    nameAction: string

}

export const ModalWindow: React.FC<ModalWindowType> = ({
                                                           children,
                                                           styleButton,
                                                           nameButton,
                                                           title,
                                                           addPackHandler,
                                                           nameClose,
                                                           nameAction,
                                                           typeAction
                                                       }) => {
    const [open, setOpen] = React.useState<boolean>(false);

    const handleOpen = () => setOpen(true)

    const handleClose = () => setOpen(false)


    return (
        <div>
            <button onClick={handleOpen} className={styleButton}>{nameButton}</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className={styleModal.header}>
                        <span className={styleModal.title}>{title}</span>
                        <button className={styleModal.close} onClick={handleClose}><img src={closeBtn} alt={"X"}/>
                        </button>
                    </div>
                    {children}
                    <BlockButtonModal nameAction={nameAction} nameClose={nameClose}
                                      actionHandler={addPackHandler} handleClose={setOpen} typeAction={typeAction}/>
                </Box>
            </Modal>
        </div>
    );
}
