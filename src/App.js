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
        sx={{
          minHeight: '84em', overflowX: 'scroll',
          paddingLeft: '2em', paddingRight: '2em',
        }}
      >
        <Grid item xs={3}>
          <FilterType />
        </Grid>
      </Grid>
    </div >
  );
}

export default App;

