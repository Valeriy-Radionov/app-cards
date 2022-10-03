import React from 'react';
import {useAppSelector} from "../../../bll/store";
import s from "../../cards/table/actionsCartTable/ActionsCardTable.module.scss";
import stroke from "../../../assets/image/Edit.svg";
import del from "../../../assets/image/Delete.svg";
import learn from "../../../assets/image/teacherlearn.svg"
import {DeletePackModal} from "../PackModal/deletePackModal/DeletePackModal";

type ActionsCardTablePropsType = {
    updateItem: (id: string) => void
    learnItem: (id: string) => void
    packId: string
    userId: string
}
export const ActionsPacks: React.FC<ActionsCardTablePropsType> = ({
                                                                      packId,
                                                                      updateItem,
                                                                      learnItem,
                                                                      userId
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
                <button onClick={() => updateItem(packId)} className={s.btn} disabled={disabled}>
                    <img src={stroke} alt={''} style={styleDisable}/>
                </button>
                {/*<button onClick={() => deleteItem(packId)} className={s.btn}*/}
                {/*        disabled={disabled}>*/}
                {/*    <img src={del} alt={''} style={styleDisable}/>*/}
                {/*</button>*/}
                <DeletePackModal packId={packId}/>
            </div> :
            <div className={s.block}>
                <button onClick={() => learnItem(packId)} className={s.btn}
                        disabled={disabled}>
                    <img src={learn} alt={''} style={styleDisable}/>
                </button>
            </div>
    );
};
//         <div>
//             <IconButton sx={{"&:hover": {color: "red"}}} onClick={() => deleteItem(packId)}>
//                 <Delete/>
//             </IconButton>
//             <IconButton sx={{"&:hover": {color: "green"}}} onClick={() => updateItem(packId)}>
//                 <Edit/>
//             </IconButton>
//             <IconButton sx={{"&:hover": {color: "cornflowerblue"}}} onClick={() => learnItem(packId)}>
//                 <SchoolOutlined/>
//             </IconButton>
//         </div> :
//         <div>
//             <IconButton sx={{"&:hover": {color: "cornflowerblue"}}} onClick={() => learnItem(packId)}>
//                 <SchoolOutlined/>
//             </IconButton>
//         </div>