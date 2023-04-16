const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');

app.use(cors());
app.use(express.json());

var rawData;

axios.get('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json')
    .then(function (response) {
        //Access the raw JSON data from the response object
        rawData = response.data;
    })
    .catch(function (error) {
        console.log(error);
    });

//Define an API endpoint that returns JSON data
app.get('/api/data', (req, res) => {
    res.json(rawData);
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})