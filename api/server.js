const express = require('express');
const app = express();
const axios = require('axios');
const _ = require("lodash");
const cors = require('cors');

app.use(cors());
app.use(express.json());

let DataToFilter = [];
var rawData;

async function getRawData() {
    await axios.get('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json')
        .then(function (response) {
            //Access the raw JSON data from the response object
            rawData = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });

    if (rawData.length > 0) {
        for (let i = 0; i < rawData.length; i++) {
            DataToFilter.push({
                photo: 'photo placeholder',
                id: rawData[i]["id"],
                name: rawData[i]["name"]["english"],
                types: rawData[i]["type"].join(', '),
                hp: rawData[i]["base"]["HP"],
                attack: rawData[i]["base"]["Sp. Attack"],
                defense: rawData[i]["base"]["Sp. Defense"],
                speed: rawData[i]["base"]["Speed"]
            });
        }
    }
}

getRawData();

//For Client
app.get('/api/data', (req, res) => {
    res.json(rawData);
});

//Define an API endpoint that returns a random pokemon and its info
app.get('/api/get_random_pokemon', (req, res) => {
    res.json({
        randomPokemon: _.sample(DataToFilter)
    });
});

//Given an ID, return its matching info
app.get('/api/get_by_id', (req, res) => {
    const idNumber = req.body.content;

    //telling API client a bad request was sent (no content)
    if (!idNumber) {
        return res.sendStatus(400);
    }
    else {
        const filteredRows = DataToFilter.filter((row) => {
            if (row.id === idNumber) {
                return row;
            }
        });

        if (filteredRows.length == 0) {
            return res.sendStatus(400);
        }

        res.json({
            selectedPokemon: filteredRows
        }).sendStatus(201); //object was successfully created
    }
});



const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})

