import React, {ChangeEvent, useState} from 'react';
import {useAppDispatch} from "../../../../bll/store";
import {ModalWindow} from "../../../../common/components/modalWindows/ModalWindow";
import {addNewCardTC, updateCardTC} from "../../../../bll/cardsReducer";
import {FormControl, MenuItem, Select, SelectChangeEvent, FormHelperText, TextField} from "@mui/material";
import s from './AddCartModal.module.scss'
import stroke from "../../../../assets/image/Edit.svg";

type AddCardModalPropsType = {
    addEditModal: 'add' | 'edit'
    _id?: string
}
export const AddCartModal: React.FC<AddCardModalPropsType> = ({addEditModal, _id}) => {
    const dispatch = useAppDispatch

    const [select, setSelectInput] = useState('')
    const [questionInput, setQuestionInput] = useState('')
    const [answerInput, setAnswerInput] = useState('')

    const clearInputs = () => {
        setSelectInput('')
        setQuestionInput('')
        setAnswerInput('')
    }

    const addNewCard = () => {
        dispatch(addNewCardTC(questionInput, answerInput))
        clearInputs()
    }

    const editCard = () => {
        _id && dispatch(updateCardTC({question: questionInput, answer: answerInput, _id}))
        clearInputs()
    }

    const handleChangeSelect = (event: SelectChangeEvent) => {
        setSelectInput(event.target.value as string);
    }

    const handleChangeQuestionInput = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestionInput(e.currentTarget.value)
    }

    const handleChangeAnswerInput = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswerInput(e.currentTarget.value)
    }

    const editImg = () => {
        return <img src={stroke} alt={''}/>
    }

    return (
        <div style={{display: 'inline-block'}}>
            <ModalWindow namePreviousBtn={addEditModal === 'add' ? "Add new cart" : editImg()}
                         titleModal={addEditModal === 'add' ? "Add new cart" : 'Edit cart'}
                         actionSaveDeleteBtn={addEditModal === 'add' ? addNewCard : editCard}
                         isSaveDeleteModal={"Save"}
                         isEdit={addEditModal}
            >
                <div className={s.blockForm}>
                    <FormControl sx={{m: 1, width: 347}}>
                        <FormHelperText>Choose a question format</FormHelperText>
                        <Select
                            value={select}
                            onChange={handleChangeSelect}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <FormHelperText>Question</FormHelperText>
                        <TextField value={questionInput}
                                   onChange={handleChangeQuestionInput}
                                   variant="standard"/>
                        <FormHelperText>Answer</FormHelperText>
                        <TextField value={answerInput}
                                   onChange={handleChangeAnswerInput}
                                   variant="standard"/>
                    </FormControl>
                </div>
            </ModalWindow>
        </div>
    );
};

export default AddCartModal;