import React, {ChangeEvent, useState} from 'react';
import {ModalWindow} from "../../../../common/components/modalWindows/ModalWindow";
import styleModal from "./AddPackModal.module.scss";
import {useAppDispatch, useAppSelector} from "../../../../bll/store";
import {addNewPackTC, updatePackTC} from "../../../../bll/packsReducer";
import stroke from "../../../../assets/image/Edit.svg"

type AddPackModalPropsType = {
    id?: string
    isAddEditPack: "edit" | "add"
}

export const AddPackModal: React.FC<AddPackModalPropsType> = ({id, isAddEditPack}) => {
    const namePack = useAppSelector(state => state.packs.cardPacks).filter(pack => id ? pack._id === id : pack)[0]?.name
    const dispatch = useAppDispatch
    const [titlePack, setTitlePack] = useState<string>(namePack || "")
    const [privatePack, setPrivatePack] = useState<boolean>(false)

    const addNewPacks = () => {
        dispatch(addNewPackTC(titlePack, privatePack))
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
    const editPack = () => {
        dispatch(updatePackTC(id!, titlePack, privatePack))
    }
    const editImg = () => {
        return <img src={stroke} alt={''}/>
    }
    return (
        <div>

            <ModalWindow namePreviousBtn={isAddEditPack === "add" ? "Add new pack" : editImg()}
                         titleModal={isAddEditPack === "add" ? "Add new pack" : "Edit Pack"}
                         actionSaveDeleteBtn={isAddEditPack === "add" ? addNewPacks : editPack}
                         isSaveDeleteModal={"Save"}
                         isEdit={isAddEditPack}
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

