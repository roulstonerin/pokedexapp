import * as React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ThemeProvider, createTheme } from "@mui/material/styles";

import './FilterType.css';


const PokemonTypeOptions = [
    'All Types',
    'Normal',
    'Fire',
    'Water',
    'Grass',
    'Electric',
    'Ice',
    'Fighting',
    'Poison',
    'Ground',
    'Flying',
    'Psychic',
    'Bug',
    'Rock',
    'Ghost',
    'Dark',
    'Dragon',
    'Steel',
    'Fairy'
];

export default function FilterType() {
    const [pokemonType, setPokemonType] = React.useState('');

    const handleChange = (event) => {
        setPokemonType(event.target.value);
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: '#2a75bb',
            },
        }
    });


    /**   '@media screen and (max-width: 900px)': {
                paddingBottom: 80,
            }, */
    return (
        <Box sx={{
            width: 300,
            paddingBottom: "20px",
            '@media screen and (max-width: 1100px)': {
                transform: 'translateY(-168px)'
            },
        }} >
            <FormControl fullWidth sx={{
                borderRadius: 2,
                backgroundColor: "white",
                label: "Filter By Type",
            }}>
                <InputLabel id="select-type-label">Filter By Type</InputLabel>
                <ThemeProvider theme={theme}>
                    <Select
                        labelId="select-type-label"
                        value={pokemonType}
                        onChange={handleChange}
                        label="Filter By Type"
                    >
                        {PokemonTypeOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </ThemeProvider>

            </FormControl>
        </Box >
    );
}