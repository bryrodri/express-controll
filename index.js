const express = require('express');
const app = express();

const cors = require("cors");
const path = require('path');

const loudness = require('loudness')

const apiPort = process.env.REACT_APP_API_PORT || 3000;

const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
const websiteDomain = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) 

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    cors({
        origin: websiteDomain, // TODO: Change to your app's website domain
        allowedHeaders: ["content-type"],
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials: true,
    })
);

//routes

var volume = require('./routes/volume');
// ...
app.use('/volume', volume);



app.get("/",(req,res)  => {
    res.sendFile(path.join(__dirname, '/templates/general/general.html'));
})

app.use((err, req, res, next) => {
    res.status(500).send("Internal error: " + err.message);
});

app.listen(apiPort, () => console.log(`API Server listening on port ${apiPort}`));