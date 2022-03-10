import React from 'react';

import {default as MuiTable} from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import {default as MuiTableContainer} from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import {styled} from '@mui/material/styles';

export const Table = styled(MuiTable)(({ theme }) => ({
    minWidth: 650,
}));

export const TableContainer = styled(MuiTableContainer)(({ theme }) => ({
    background: '#fff',
}));

function createData(key: string, value: string) {
    return { key, value };
}

const rows = [
    createData('Verwandtschaft', 'Lorem ipsum'),
    createData('Lebensraum', 'Lorem ipsum'),
    createData('Lebensweise', 'Lorem ipsum'),
    createData('Sozialstruktur', 'Lorem ipsum'),
    createData('Futter', 'bis zu 150 kg'),
    createData('Gewicht', '300kg'),
    createData('Körperhöhe', '6m'),
    createData('Schwanzlänge', '20cm'),
    createData('Tragzeit', '12 Monate'),
    createData('Lebenserwartung', '23 Jahre'),
];


export default function BasicTable() {

    return (
        <TableContainer>
            <Table
                aria-label="simple table"
            >
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.key}>
                            <TableCell style={{ width: 150, fontWeight:'bold' }}>
                                {row.key}
                            </TableCell>
                            <TableCell>{row.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
