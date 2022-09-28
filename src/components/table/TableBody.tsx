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
import s from './TableBode.module.scss'

type MapTableBodyPropsType = {
    items: CardType[]
    deleteItem?: (id: string) => void
    isWho: 'packs' | 'cards'
    isMy: boolean
}

export const MapTableBody: React.FC<MapTableBodyPropsType> = ({items, deleteItem, isWho,isMy}) => {

    return (<>
            <TableBody>
                {items.map(item => {
                    return (
                        <TableRow key={item._id} hover>
                            <TableCell align="center" component="th" scope="row">
                                {item.question}
                            </TableCell>
                            <TableCell align="center">
                                {item.answer}
                            </TableCell>
                            <TableCell align="center">
                                {formatDate(item.updated)}
                            </TableCell>
                            <TableCell align="center" >
                                <div className={s.rating} >
                                    <Rating name="read-only" value={Number(item.grade)}
                                            readOnly/>
                                    {
                                        isWho === 'cards' && deleteItem &&
                                        <ActionsCardTable id={item._id} deleteItem={deleteItem} isMy={isMy}/>
                                    }
                                    {
                                        isWho === 'packs' && <span>gggvhbj</span>
                                    }
                                </div>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </>
    );
};

