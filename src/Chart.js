import * as React from 'react';
import { Box, FormControl, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
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
export default function Chart({ selectedOption }) {
    const [isLoading, setLoading] = React.useState(true);
    const [pokemonData, setPokemonData] = React.useState([]);

    React.useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:5000/api/data');
                const data = await response.json();

                setPokemonData(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);



    let rows = [];
    if (pokemonData.length > 0) {
        for (let i = 0; i < pokemonData.length; i++) {
            if (pokemonData[i].id < 10) {
                var url = "00" + pokemonData[i]["id"].toString();
            } else if (pokemonData[i].id < 100) {
                var url = "0" + pokemonData[i]["id"].toString();
            } else { //is < 1000
                var url = pokemonData[i]["id"].toString();
            }

            rows.push({
                photo: `https://github.com/fanzeyi/pokemon.json/raw/master/images/${url}.png`,
                id: pokemonData[i]["id"],
                name: pokemonData[i]["name"]["english"],
                types: pokemonData[i]["type"].join(', '),
                hp: pokemonData[i]["base"]["HP"],
                attack: pokemonData[i]["base"]["Sp. Attack"],
                defense: Math.round(pokemonData[i]["base"]["Sp. Defense"]),
                speed: Math.round(pokemonData[i]["base"]["Speed"])
            });
        }
    }

    const filteredRows = rows.filter((row) => {
        if (selectedOption === "All Types") {
            return row;
        }
        return row.types.includes(selectedOption);
    });



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
        <div>
            <FormControl>
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
                            <TableBody>
                                {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id} onClick={() => handleRowClick(row)}>
                                            {pokemonPropertyTableColumns.slice(0, 1).map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        <img className="thumbnail" src={row.photo} />
                                                    </TableCell>
                                                );
                                            })}
                                            {pokemonPropertyTableColumns.slice(1).map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === "number" ? column.format(value) : value}
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
                        count={filteredRows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    <Modal open={open} onClose={handleClose} >
                        <Box className="pokemon-card" sx={{
                            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, height: '65%', width: '400px'
                        }}>
                            <Box sx={{
                                display: 'flex', justifyContent: 'flex-end', mb: 1, display: "inline-block", position: 'absolute',
                                left: '98%', top: '-8%', backgroundColor: '#E8E8E8', borderRadius: '30px'
                            }}>
                                <IconButton variant="outlined" onClick={handleClose} sx={{ color: 'black' }}>
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                            <Typography variant="h5" gutterBottom>
                                <div class="pokemon-name">{selectedRow && selectedRow[pokemonPropertyTableColumns[2].id]}</div>
                                <div class="pokemon-hp">
                                    <div class="hp">HP</div>
                                    <div class="hp-value">{selectedRow && selectedRow[pokemonPropertyTableColumns[4].id]}</div>
                                </div>
                                <div></div>
                            </Typography>
                            <div class="pokemon-image"><img className="modal-photo" src={selectedRow && selectedRow[pokemonPropertyTableColumns[0].id]} /></div>
                            <div class="pokemon-image-description">ID: {selectedRow && selectedRow[pokemonPropertyTableColumns[1].id]}</div>
                            <table class="card-items">
                                <tbody class="card-items">
                                    <tr class="card-items">type: {selectedRow && selectedRow[pokemonPropertyTableColumns[3].id]}</tr>
                                    <tr class="card-items">attack: {selectedRow && selectedRow[pokemonPropertyTableColumns[5].id]}</tr>
                                    <tr class="card-items">defense: {selectedRow && selectedRow[pokemonPropertyTableColumns[6].id]}</tr>
                                    <tr class="card-items">speed: {selectedRow && selectedRow[pokemonPropertyTableColumns[7].id]}</tr>
                                </tbody>
                            </table>
                        </Box>
                    </Modal>
                </Paper >
            </FormControl>
        </div >
    );
}
