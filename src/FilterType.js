import * as React from 'react';
import { Box, InputLabel, MenuItem, Select } from '@mui/material';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import FormControlUnstyled from '@mui/base/FormControlUnstyled';

import './FilterType.css';
import Chart from './Chart.js';



export default function FilterType() {
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

    let PokemonTypeOptions = new Set();
    if (pokemonData.length > 0) {
        for (let i = 0; i < pokemonData.length; i++) {
            for (let j = 0; j < pokemonData[i]["type"].length; j++) {
                if (!PokemonTypeOptions.has(pokemonData[i])) {
                    PokemonTypeOptions.add(pokemonData[i]["type"][j]);
                }
            }
        }
    }

    let typeOptions = Array.from(PokemonTypeOptions);
    typeOptions.unshift("All Types");
    console.log(typeOptions);

    const [pokemonType, setPokemonType] = React.useState(typeOptions[0]);

    const handleChange = (event) => {
        const selectedOption = event.target.value;
        setPokemonType(selectedOption);
    };


    const theme = createTheme({
        palette: {
            primary: {
                main: '#2a75bb',
            },
        }
    });
    return (

        <FormControlUnstyled sx={{
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
                    sx={{ width: '30%', backgroundColor: 'white', borderRadius: 9, }}
                >
                    {typeOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>

            </ThemeProvider>
            {pokemonType && (
                <Box sx={{ marginTop: '20px' }}>
                    <Chart selectedOption={pokemonType} />
                </Box>
            )}
        </FormControlUnstyled>
    );
}