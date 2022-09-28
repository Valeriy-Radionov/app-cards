import React from 'react';
import {Delete} from "@mui/icons-material";
import {IconButton} from "@mui/material";

type ActionsCardTablePropsType = {
    deleteItem: (id: string) => void
    id: string
}
export const ActionsPacks: React.FC<ActionsCardTablePropsType> = ({deleteItem, id}) => {

    return (
        <div>
            <IconButton onClick={() => deleteItem(id)}>
                <Delete/>
            </IconButton>
            {/*<button onClick={() => deleteItem(id)}>delete</button>*/}
        </div>
    );
};