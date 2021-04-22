const functions = require('firebase-functions');
const fetch = require('node-fetch')

const api = `https://newsapi.org/v2/everything?q={{searchTerm}}`; 
const apiKey = "&apiKey=4cd6ebeef6654d8aadb92ed84e1d5390"; 
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.api = functions.https.onRequest(async (req ,res ) => {
    let searchTerm = req.body.searchTerm 
    let results = []
    let url = api.replace('{{searchTerm}}', searchTerm) 

    await fetch(url + apiKey)
        .then(res => res.json())
        .then(data => { 
            console.log(data)
            results = data.articles
        }) 
    
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', '*');
    res.json(results)
});
