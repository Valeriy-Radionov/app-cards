import React from 'react';
import {TableBody, TableCell, TableRow} from '@mui/material'
import {formatDate} from "../../../assets/utils/formatDate-utils";
import {CardPackType} from "../../../api/packs/packs-api";
import {ActionsPacks} from "./ActionsPacks";
import {useNavigate} from 'react-router-dom'

type MapTableBodyPropsType = {
    items: CardPackType[]
    learnPack: (id: string) => void
    updatePack: (id: string) => void
}

export const PacksTableBody: React.FC<MapTableBodyPropsType> = ({
                                                                    items,
                                                                    updatePack,
                                                                    learnPack
                                                                }) => {
    const navigate = useNavigate()
    return (
        <TableBody>
            {items.map(item => {
                return (
                    <TableRow key={item._id} sx={{
                        "&:hover": {bgcolor: "lightgray"}
                    }}>
                        <TableCell align="left"
                                   onClick={() => navigate(`/cards/${item._id}`, {state: item._id})}
                                   sx={{
                                       "&:hover": {color: "cornflowerblue"}
                                   }}
                        >
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
                            <ActionsPacks
                                learnItem={learnPack}
                                updateItem={updatePack}
                                packId={item._id}
                                userId={item.user_id}
                                packName={item.name}
                            />
                        </TableCell>
                    </TableRow>)
            })}
        </TableBody>
    );
};

