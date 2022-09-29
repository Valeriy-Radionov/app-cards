import React from 'react';
import {useAppSelector} from "../../../bll/store";
import s from "../../cards/ActionsCardTable.module.scss";
import stroke from "../../../common/image/Edit.svg";
import del from "../../../common/image/Delete.svg";
import learn from "../../../common/image/teacherlearn.svg"

type ActionsCardTablePropsType = {
    deleteItem: (id: string) => void
    updateItem: (id: string) => void
    learnItem: (id: string) => void
    packId: string
    userId: string
}
export const ActionsPacks: React.FC<ActionsCardTablePropsType> = ({
                                                                      deleteItem,
                                                                      packId,
                                                                      updateItem,
                                                                      learnItem,
                                                                      userId
                                                                  }) => {
    const userProfileId = useAppSelector(state => state.profile.user?._id)

    return (
        userProfileId === userId ?
            <div className={s.block}>
                <button onClick={() => learnItem(packId)} className={s.btn}>
                    <img src={learn} alt={''}/>
                </button>
                <button onClick={() => updateItem(packId)} className={s.btn}>
                    <img src={stroke} alt={''}/>
                </button>
                <button onClick={() => deleteItem(packId)} className={s.btn}>
                    <img src={del} alt={''}/>
                </button>
            </div> :
            <div className={s.block}>
                <button onClick={() => learnItem(packId)} className={s.btn}>
                    <img src={learn} alt={''}/>
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