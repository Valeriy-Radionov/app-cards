import React from 'react';
import {useAppSelector} from "../../../bll/store";
import s from "../../cards/table/actionsCartTable/ActionsCardTable.module.scss";
import learn from "../../../assets/image/teacherlearn.svg"
import {DeletePackModal} from "../PackModal/deletePackModal/DeletePackModal";
import {AddPackModal} from "../PackModal/addEditPackModal/AddPackModal";

type ActionsCardTablePropsType = {
    updateItem: (id: string) => void
    learnItem: (id: string) => void
    packId: string
    userId: string
    packName: string
}
export const ActionsPacks: React.FC<ActionsCardTablePropsType> = ({
                                                                      packId,
                                                                      updateItem,
                                                                      learnItem,
                                                                      userId,
                                                                      packName
                                                                  }) => {

    const userProfileId = useAppSelector(state => state.profile.user?._id)
    const status = useAppSelector(state => state.app.status)
    const disabled = status === "loading"
    const styleDisable = status === "loading" ? {opacity: "0.5"} : {}

    return (
        userProfileId === userId ?
            <div className={s.block}>
                <button onClick={() => learnItem(packId)} className={s.btn} disabled={disabled}>
                    <img src={learn} alt={''} style={styleDisable}/>
                </button>
                <AddPackModal isAddEditPack={"edit"} id={packId}/>
                <DeletePackModal packId={packId} packName={packName}/>
            </div> :
            <div className={s.block}>
                <button onClick={() => learnItem(packId)} className={s.btn}
                        disabled={disabled}>
                    <img src={learn} alt={''} style={styleDisable}/>
                </button>
            </div>
    );
};
