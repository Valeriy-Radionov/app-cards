import React from 'react';
import {TableBody, TableCell, TableRow} from '@mui/material'
import {formatDate} from "../../../utils/formatDate-utils";
import {CardPackType} from "../../../api/packs/packs-api";
import {ActionsPacks} from "./ActionsPacks";
import {useAppSelector} from "../../../bll/store";

type MapTableBodyPropsType = {
    items: CardPackType[]
    deleteItem?: (id: string) => void
    isWho: "packs"
}

export const PacksTableBody: React.FC<MapTableBodyPropsType> = ({items, deleteItem, isWho}) => {
    const userID = useAppSelector(state => state.profile.user?._id)

    return (<>
            <TableBody>
                {items.map(item => {
                    return (
                        <TableRow key={item._id}>
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
                                {/*
                                    pack && two buttons
                                    cards && 3 B
                                    з*/}
                                {
                                    isWho === 'packs' && deleteItem ?
                                        <ActionsPacks id={item._id} deleteItem={deleteItem}/> : 'pack'
                                }
                            </TableCell>
                        </TableRow>)
                })}
            </TableBody>
        </>
    );
};

