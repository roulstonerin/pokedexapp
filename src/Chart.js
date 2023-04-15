import * as React from 'react';
import { Box, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import './Chart.css';

const pokemonPropertyTableColumns = [
    { id: 'photo', label: 'Photo', minWidth: 50 },
    { id: 'id', label: 'ID', minWidth: 50 },
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'types', label: 'Types', minWidth: 100 },
    {
        id: 'hp',
        label: 'HP',
        minWidth: 50,
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'attack',
        label: 'Attack',
        minWidth: 50,
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'defense',
        label: 'Defense',
        minWidth: 50,
        format: (value) => value.toFixed(2),
    },
    {
        id: 'speed',
        label: 'Speed',
        minWidth: 50,
        format: (value) => value.toFixed(2),
    }
];

//This does nothing for now until I can get my data! :) 
function createData(photo, id, name, types, hp, attack, defense, speed) {
    //const density = population / size;
    return { photo, id, name, types, hp, attack, defense, speed };
}

//Dummy Data! 
const rows = [
    createData('India', 'IN', 1324171354, 3287263, 'Cheese', 'Biscuits', 'Pizza', 'Flowers'),
    createData('China', 'CN', 1403500365, 9596961, 'Cheese', 'Biscuits', 'Pizza', 'Flowers'),
    createData('Italy', 'IT', 60483973, 301340, 'Cheese', 'Biscuits', 'Pizza', 'Flowers'),
    createData('United States', 'US', 327167434, 9833520, 'Cheese', 'Biscuits', 'Pizza', 'Flowers'),
    createData('Canada', 'CA', 37602103, 9984670, 'Cheese', 'Biscuits', 'Pizza', 'Flowers'),
    createData('Australia', 'AU', 25475400, 7692024, 'Cheese', 'Biscuits', 'Pizza', 'Flowers'),
    createData('Germany', 'DE', 83019200, 357578, 'Cheese', 'Biscuits', 'Pizza', 'Flowers'),
    createData('Ireland', 'IE', 4857000, 70273, 'Cheese', 'Biscuits', 'Pizza', 'Flowers'),
    createData('Mexico', 'MX', 126577691, 1972550, 'Cheese', 'Biscuits', 'Pizza', 'Flowers'),
    createData('Japan', 'JP', 126317000, 377973, 'Cheese', 'Biscuits', 'Pizza', 'Flowers'),
    createData('France', 'FR', 67022000, 640679, 'Cheese', 'Biscuits', 'Pizza', 'Flowers'),
    createData('United Kingdom', 'GB', 67545757, 242495, 'Cheese', 'Biscuits', 'Pizza', 'Flowers'),
    createData('Russia', 'RU', 146793744, 17098246, 'Cheese', 'Biscuits', 'Pizza', 'Flowers'),
    createData('Nigeria', 'NG', 200962417, 923768, 'Cheese', 'Biscuits', 'Pizza', 'Flowers'),
    createData('Brazil', 'BR', 210147125, 8515767, 'Cheese', 'Biscuits', 'Pizza', 'Flowers'),
];

export default function Chart() {
    //Track the current page, rows per page, and selected row
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleRowClick = (row) => {
        setSelectedRow(row);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', minWidth: 300 }}>
            <TableContainer sx={{
                maxHeight: 440
            }}>
                <Table stickyHeader aria-label="sticky table" sx={{ cursor: 'pointer', }}>

                    <TableHead >
                        <TableRow>

                            {pokemonPropertyTableColumns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code} onClick={() => handleRowClick(row)}>
                                        {pokemonPropertyTableColumns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Modal open={open} onClose={handleClose} >
                <Box className="pokemon-card" sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, height: '65%'
                }}>
                    <Box sx={{
                        display: 'flex', justifyContent: 'flex-end', mb: 1, display: "inline-block", position: 'absolute',
                        left: '98%', top: '-8%', backgroundColor: '#E8E8E8', borderRadius: '30px'
                    }}>
                        <IconButton variant="outlined" onClick={handleClose} sx={{ color: 'black' }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Typography variant="h5" id="modal-title" gutterBottom>
                        <div class="pokemon-name"> {selectedRow && selectedRow[pokemonPropertyTableColumns[2].id]}</div>
                        <div class="pokemon-hp">
                            <div class="hp">HP</div>
                            <div class="hp-value"> {selectedRow && selectedRow[pokemonPropertyTableColumns[4].id]}</div>

                        </div>
                        <div></div>
                    </Typography>
                    <div class="pokemon-image"> {selectedRow && selectedRow[pokemonPropertyTableColumns[0].id]}</div>
                    <div class="pokemon-image-description"> {selectedRow && selectedRow[pokemonPropertyTableColumns[1].id]}</div>
                    <table class="card-items">
                        <tbody>
                            <tr>types</tr>
                            <hr></hr>
                            <tr id="attack">attack</tr>
                            <hr></hr>
                            <tr class="defense">defense</tr>
                            <hr></hr>
                            <tr class="speed">speed</tr>
                        </tbody>
                    </table>
                </Box>
            </Modal>
        </Paper >
    );
}