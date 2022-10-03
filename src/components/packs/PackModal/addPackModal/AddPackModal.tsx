import React, {ChangeEvent} from 'react';
import styleModal from "../../../../common/components/modalWindows/ContentModal.module.scss"

type AddPackModalType = {
    titlePack: string
    setState: (value: string) => void
    setPrivatePack: (value: boolean) => void
}
export const AddPackModal: React.FC<AddPackModalType> = ({titlePack, setState, setPrivatePack}) => {

    const changeTitlePack = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setState(value)
    }
    const privatePack = (e: ChangeEvent<HTMLInputElement>) => {
        const privatePack = e.currentTarget.checked
        setPrivatePack(privatePack)
    }

    return (
        <div className={styleModal.bodyBlock}>
            <span className={styleModal.titleBlock}>Name pack</span>
            <input value={titlePack} className={styleModal.InputBlock} onChange={changeTitlePack}/>
            <div className={styleModal.selectionBlock}>
                <input type={"checkbox"} className={styleModal.checkbox} onChange={privatePack}/>
                <label className={styleModal.description}>Private pack</label>
            </div>

        </div>
    );
};

