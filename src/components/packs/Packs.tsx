import React, {useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {AppRootStateType, useAppDispatch, useAppSelector} from "../../bll/store";
import {setUsersPacksTC} from "../../bll/packsReducer";
import {Button} from "@mui/material";

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return {name, calories, fat, carbs, protein};
}


const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),

];

export type PackPropsType = {}
export const Packs: React.FC<PackPropsType> = (props) => {
    const isInitialized = useAppSelector((state: AppRootStateType) => state.app.isInitialized)
    const packs = useAppSelector((state: AppRootStateType) => state.packs.cardPacks)
    const dispatch = useAppDispatch

    useEffect(() => {
        if (isInitialized) {
            dispatch(setUsersPacksTC())
        }
    }, [setUsersPacksTC])

    return (
        <Paper sx={{width: "1008px", overflow: "hidden"}} elevation={4}>
            <TableContainer sx={{maxHeight: "432px", justifyContent: "center"}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell variant={"head"} align={"left"}>Name</TableCell>
                            <TableCell align={"left"}>Cards</TableCell>
                            <TableCell align={"left"}>Last Updated</TableCell>
                            <TableCell align={"left"}>Created by</TableCell>
                            <TableCell align={"left"}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {packs.map((pack) => (
                            <TableRow
                                key={pack._id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}
                                }
                            >
                                <TableCell component="th" scope="row">{pack.name}</TableCell>
                                <TableCell align="left">{pack.cardsCount}</TableCell>
                                <TableCell align="left">{pack.updated.toString()}</TableCell>
                                <TableCell align="left">{pack.user_name}</TableCell>
                                <TableCell align="left">
                                    <div>
                                        <Button>click</Button>
                                        <Button>click2</Button>
                                        <Button>click2</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}