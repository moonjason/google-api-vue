const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch')
const app = express();

const api = `https://newsapi.org/v2/everything?q={{searchTerm}}`; 
const apiKey = "&apiKey=4cd6ebeef6654d8aadb92ed84e1d5390"; 
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Add middleware to authenticate requests

// build multiple CRUD interfaces:
app.get('/', (req, res) => {
    let results = []
    let url = api.replace('{{searchTerm}}', searchTerm) 

    fetch(url + apiKey)
        .then(res => res.json())
        .then(data => results = data.articles) 

    res.json(results)
});

// Expose Express API as a single Cloud Function:
exports.newsApi = app;