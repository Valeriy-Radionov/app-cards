import React from 'react';
import {
    TableBody,
    TableCell,
    TableRow,
    Rating
} from '@mui/material'
import {CardType} from "../../api/cards/cards-api";
import {formatDate} from "../../utils/formatDate-utils";
import {ActionsCardTable} from "../cards/ActionsCardTable";

type MapTableBodyPropsType = {
    items: CardType[]
    deleteItem?: (id: string) => void
    isWho: 'packs' | 'cards'
}

export const MapTableBody: React.FC<MapTableBodyPropsType> = ({items, deleteItem, isWho}) => {

    return (<>
                <TableBody>
                    {items.map(item => {
                        return (
                            <TableRow key={item._id}>
                                <TableCell align="center" component="th" scope="row">
                                    {item.question}
                                </TableCell>
                                <TableCell align="center">
                                    {item.answer}
                                </TableCell>
                                <TableCell align="center">
                                    {formatDate(item.updated)}
                                </TableCell>
                                <TableCell align="center">
                                    <Rating name="read-only" value={Number(item.grade)}
                                            readOnly/>
                                </TableCell>
                                <TableCell align="center">
                                    {/*
                                    pack && two buttons
                                    cards && 3 B
                                    з*/}
                                    {
                                        isWho === 'cards' && deleteItem ? <ActionsCardTable id={item._id} deleteItem={deleteItem}/> : 'pack'
                                    }
                                </TableCell>
                            </TableRow>)
                    })}
                </TableBody>
        </>
    );
};

