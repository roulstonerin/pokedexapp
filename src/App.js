import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';

import './App.css';
import Pokeball from './Pokeball';
import FilterType from './FilterType';

function App() {
  return (
    <div className="App">
      <div id="padding" />
      <Pokeball />
      <Box sx={{
        '@media screen and (max-width: 1200px)': {
          pl: '30px', pr: '30px'
        },

      }}>
      </Box>
      <Grid
        container
        spacing={30}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '150vh' }}
      >

        <Grid item xs={3}>
          <FilterType />
        </Grid>

      </Grid>


    </div >
  );
}

export default App;