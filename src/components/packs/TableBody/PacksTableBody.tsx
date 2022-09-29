import React from 'react';
import {TableBody, TableCell, TableRow} from '@mui/material'
import {formatDate} from "../../../utils/formatDate-utils";
import {CardPackType} from "../../../api/packs/packs-api";
import {ActionsPacks} from "./ActionsPacks";

type MapTableBodyPropsType = {
    items: CardPackType[]
    deletePack: (id: string) => void
    learnPack: (id: string) => void
    updatePack: (id: string) => void
}

export const PacksTableBody: React.FC<MapTableBodyPropsType> = ({
                                                                    items,
                                                                    deletePack,
                                                                    updatePack,
                                                                    learnPack
                                                                }) => {

    return (
        <TableBody>
            {items.map(item => {
                return (
                    <TableRow key={item._id} sx={{
                        "&:hover": {bgcolor: 'lightgray'}
                    }}>
                        <TableCell align="left">
                            {item.name}
                        </TableCell>
                        <TableCell align="left">
                            {item.cardsCount}
                        </TableCell>
                        <TableCell align="left">
                            {formatDate(item.updated)}
                        </TableCell>
                        <TableCell align="left">{item.user_name}</TableCell>
                        <TableCell align="left">
                            <ActionsPacks learnItem={learnPack}
                                          updateItem={updatePack}
                                          deleteItem={deletePack}
                                          packId={item._id}
                                          userId={item.user_id}
                            />
                        </TableCell>
                    </TableRow>)
            })}
        </TableBody>
    );
};

