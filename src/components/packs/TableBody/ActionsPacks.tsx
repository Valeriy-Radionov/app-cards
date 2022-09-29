import React from 'react';
import {Delete, Edit, SchoolOutlined} from "@mui/icons-material";
import {IconButton} from "@mui/material";

type ActionsCardTablePropsType = {
    deleteItem?: (id: string) => void
    updateItem?: (id: string) => void
    learnItem: (id: string) => void
    id: string
}
export const ActionsPacks: React.FC<ActionsCardTablePropsType> = ({deleteItem, id, updateItem, learnItem}) => {

    return (
        deleteItem && updateItem ?
            <div>
                <IconButton sx={{"&:hover": {color: "red"}}} onClick={() => deleteItem(id)}>
                    <Delete/>
                </IconButton>
                <IconButton sx={{"&:hover": {color: "green"}}} onClick={() => updateItem(id)}>
                    <Edit/>
                </IconButton>
                <IconButton sx={{"&:hover": {color: "cornflowerblue"}}} onClick={() => learnItem(id)}>
                    <SchoolOutlined/>
                </IconButton>
            </div> :
            <div>
                <IconButton sx={{"&:hover": {color: "cornflowerblue"}}} onClick={() => learnItem(id)}>
                    <SchoolOutlined/>
                </IconButton>
            </div>
    );
};