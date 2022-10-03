import React, {ChangeEvent, useState} from 'react';
import {ModalWindow} from "../../../../common/components/modalWindows/ModalWindow";
import styleModal from "./AddPackModal.module.scss";
import {useAppDispatch, useAppSelector} from "../../../../bll/store";
import {addNewPackTC} from "../../../../bll/packsReducer";

type AddPackModalPropsType = { }

export const AddPackModal: React.FC<AddPackModalPropsType> = ({ }) => {
    const userID = useAppSelector(state => state.profile.user?._id)
    const dispatch = useAppDispatch
    const [titlePack, setTitlePack] = useState<string>("")
    const [privatePack, setPrivatePack] = useState<boolean>(false)

    const addNewPacks = () => {
        userID && dispatch(addNewPackTC(userID!, titlePack, privatePack))
        setTitlePack("")
    }

    const changeTitlePackHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setTitlePack(value)
    }

    const privatePackHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const privatePack = e.currentTarget.checked
        setPrivatePack(privatePack)
    }

    return (
        <div>
            <ModalWindow namePreviousBtn={"Add new pack"}
                         titleModal={"Add new pack"}
                         actionSaveDeleteBtn={addNewPacks}
                         isSaveDeleteModal={"Save"}
            >
                <div className={styleModal.bodyBlock}>
                    <span className={styleModal.titleBlock}>Name pack</span>
                    <input value={titlePack} className={styleModal.InputBlock} onChange={changeTitlePackHandler}/>
                    <div className={styleModal.selectionBlock}>
                        <input type={"checkbox"} className={styleModal.checkbox} onChange={privatePackHandler}/>
                        <label className={styleModal.description}>Private pack</label>
                    </div>
                </div>
            </ModalWindow>
        </div>
    );
};

