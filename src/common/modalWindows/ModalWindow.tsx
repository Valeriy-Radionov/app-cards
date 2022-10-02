import React, {ReactNode} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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
    styleButton?: string | undefined
    nameButton?: string | undefined
    open: boolean
    handleOpen: () => void
    handleClose: () => void
}

export const ModalWindow: React.FC<ModalWindowType> = ({
                                                           children,
                                                           styleButton,
                                                           nameButton,
                                                           handleOpen,
                                                           handleClose, open
                                                       }) => {

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
                    {children}
                </Box>
            </Modal>
        </div>
    );
}
