import * as React from 'react';
import {
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableFooter,
    TablePagination
} from '@mui/material'
import {CardsType} from "../../bll/cardsReducer";
import arrow from '../../common/image/arrow.svg'

type BasicTablePropsType = {
    addParamsGrade: () => void
    grade: boolean
    handleChangePage: (event: unknown, newPage: number) => void
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
    children: React.ReactNode
    stateItems: CardsType
}

export const BasicTable: React.FC<BasicTablePropsType> = ({
                                                              addParamsGrade,
                                                              grade,
                                                              handleChangePage,
                                                              handleChangeRowsPerPage,
                                                              children,
                                                              stateItems
                                                          }) => {

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Question</TableCell>
                        <TableCell align="center">Answer</TableCell>
                        <TableCell align="center">Last Updated</TableCell>
                        <TableCell align="left" onClick={addParamsGrade}>
                            Grade
                            <img src={arrow} style={grade ? {transform: 'rotate(180deg)'} : {} } alt='arrow'/>
                        </TableCell>
                    </TableRow>
                </TableHead>
                {children}
                <TableFooter>
                    <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                count={+stateItems.cardsTotalCount}
                                rowsPerPage={+stateItems.pageCount}
                                page={+stateItems.page - 1}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}
