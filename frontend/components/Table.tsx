import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    tableContainer:{
        background: '#fff',
    },
    table: {
        minWidth: 650,
    },
});

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
    const classes = useStyles();

    return (
        <TableContainer
            className={classes.tableContainer}
        >
            <Table
                className={classes.table}
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
