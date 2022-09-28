import * as React from 'react';
import {Paper, Table, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow} from '@mui/material'
import {PacksType} from "../../bll/packsReducer";

type BasicTablePropsType = {
    handleChangePage: (event: unknown, newPage: number) => void
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
    children: React.ReactNode
    statePacks: PacksType
}

export const PacksTableContainer: React.FC<BasicTablePropsType> = ({
                                                                       handleChangePage,
                                                                       handleChangeRowsPerPage,
                                                                       children,
                                                                       statePacks
                                                                   }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Cards</TableCell>
                        <TableCell align="left">Last Updated</TableCell>
                        <TableCell align="left">Created by</TableCell>
                        <TableCell align="left">Actions</TableCell>
                    </TableRow>
                </TableHead>
                {children}
                <TableFooter>
                    <TableRow>
                        {statePacks &&
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                count={+statePacks.cardPacksTotalCount}
                                rowsPerPage={+statePacks.pageCount}
                                page={+statePacks.page - 1}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />}
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}
