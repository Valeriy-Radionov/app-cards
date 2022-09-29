import React from 'react';
import {TableBody, TableCell, TableRow} from '@mui/material'
import {formatDate} from "../../../utils/formatDate-utils";
import {CardPackType} from "../../../api/packs/packs-api";
import {ActionsPacks} from "./ActionsPacks";
import {useAppSelector} from "../../../bll/store";

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
    const userID = useAppSelector(state => state.profile.user?._id)

    return (<>
            <TableBody>
                {items.map(item => {
                    return (
                        <TableRow key={item._id} hover role="complementary" tabIndex={-1}>
                            <TableCell align="left" component="th" scope="row">
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
        </>
    );
};

