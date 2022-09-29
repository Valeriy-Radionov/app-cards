import React from 'react';
import {Delete, Edit, SchoolOutlined} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {useAppSelector} from "../../../bll/store";

type ActionsCardTablePropsType = {
    deleteItem: (id: string) => void
    updateItem: (id: string) => void
    learnItem: (id: string) => void
    packId: string
    userId: string
}
export const ActionsPacks: React.FC<ActionsCardTablePropsType> = ({deleteItem, packId, updateItem, learnItem, userId}) => {
    const userProfileId = useAppSelector(state => state.profile.user?._id)

    return (
        userProfileId === userId ?
            <div>
                <IconButton sx={{"&:hover": {color: "red"}}} onClick={() => deleteItem(packId)}>
                    <Delete/>
                </IconButton>
                <IconButton sx={{"&:hover": {color: "green"}}} onClick={() => updateItem(packId)}>
                    <Edit/>
                </IconButton>
                <IconButton sx={{"&:hover": {color: "cornflowerblue"}}} onClick={() => learnItem(packId)}>
                    <SchoolOutlined/>
                </IconButton>
            </div> :
            <div>
                <IconButton sx={{"&:hover": {color: "cornflowerblue"}}} onClick={() => learnItem(packId)}>
                    <SchoolOutlined/>
                </IconButton>
            </div>
    );
};