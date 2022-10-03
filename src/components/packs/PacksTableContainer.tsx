import * as React from 'react';
import {Paper, Table, TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material'
import {PacksType} from "../../bll/packsReducer";
import arrow from "../../assets/image/arrow.svg";

type BasicTablePropsType = {
    handleChangePage: (event: unknown, newPage: number) => void
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
    children: React.ReactNode
    statePacks: PacksType
    addParamsUpdate: () => void
    sorting: boolean
}

export const PacksTableContainer: React.FC<BasicTablePropsType> = ({
                                                                       handleChangePage,
                                                                       handleChangeRowsPerPage,
                                                                       children,
                                                                       statePacks,
                                                                       addParamsUpdate,
                                                                       sorting
                                                                   }) => {
    return (
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
            <TableContainer sx={{height: 432}}>
                <Table sx={{minWidth: 650}} stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Cards</TableCell>
                            <TableCell align="left">Last Updated</TableCell>
                            <TableCell align="left" onClick={addParamsUpdate}>
                                Created by
                                <img src={arrow} style={sorting ? {transform: 'rotate(180deg)'} : {}} alt='arrow'/>
                            </TableCell>
                            <TableCell align="left">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    {children}
                </Table>
            </TableContainer>
            {statePacks &&
                <TablePagination component={"div"}
                                 rowsPerPageOptions={[5, 10, 25]}
                                 count={+statePacks.cardPacksTotalCount}
                                 rowsPerPage={+statePacks.pageCount}
                                 page={+statePacks.page - 1}
                                 onPageChange={handleChangePage}
                                 onRowsPerPageChange={handleChangeRowsPerPage}
                />
            }
        </Paper>
    );
}
