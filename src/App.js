import './App.css';
import Chart from './Chart';
import Pokeball from './Pokeball';
import FilterType from './FilterType';
import { Box } from '@mui/material';
//20

function App() {
  return (
    <div className="App">
      <div id="padding" />
      <Pokeball />
      <Box p={20} sx={{
        '@media screen and (max-width: 1200px)': {
          pl: '30px', pr: '30px'
        },

      }}>
        <FilterType className="filter-type" />
        <Chart />

      </Box>

    </div >
  );
}

export default App;