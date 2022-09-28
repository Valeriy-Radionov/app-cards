import * as React from 'react';

import {Rating} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {Table, TableBody, TableCell,TableContainer, TableHead, TableRow, Paper} from '@mui/material'
import {deleteCardsTC} from "../../bll/cardsReducer";
import arrow from '../../common/image/arrow.svg'


export const BasicTable: React.FC<{packId: string, addParamsGrade: () => void, grade: boolean}> = ({packId, addParamsGrade, grade}) =>  {
    const cards = useAppSelector(state => state.cards)
    const dispatch = useAppDispatch

    const deleteCard = (id: string) => {
        dispatch(deleteCardsTC(id))
    }
   const formatDate = (date: Date | string | number) => {
        return new Date(date).toLocaleDateString('ru-RU') + ' ' + new Date(date).toLocaleTimeString()
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Question</TableCell>
                        <TableCell align="center">Answer</TableCell>
                        <TableCell align="center">Last Updated</TableCell>
                        <TableCell align="center" onClick={addParamsGrade}>
                            Grade
                            <img src={arrow} style={ grade ? {transform: 'rotate(180deg)'} : {} }/>
                        </TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cards.cards.map((card, i) => (
                        <TableRow key={card._id}>
                            <TableCell align="center" component="th" scope="row">
                                {card.question}
                            </TableCell>
                            <TableCell align="center">
                                {card.answer}
                            </TableCell>
                            <TableCell align="center">
                                {formatDate(card.updated)}
                            </TableCell>
                            <TableCell align="center">
                                <Rating name="read-only" value={Number(cards.cards[i].grade)}
                                        readOnly/>
                            </TableCell>
                            <TableCell align="center">
                                <button onClick={() => deleteCard(card._id)}>delete</button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
