const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const axios = require('axios');
const CryptoJS = require('crypto-js');
require("dotenv").config();

app.use(express.json());

app.use(express.static("public"));
// 루트 엔드포인트 처리
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

app.post('/increment', (req, res) => {
    const number = parseInt(req.body.number);
    if (isNaN(number)) {
        res.status(400).send('Invalid number');
    } else {
        const result = onLoggin(number);
        res.send(result.toString());
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});