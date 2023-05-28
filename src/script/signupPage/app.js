const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const axios = require('axios');
const CryptoJS = require('crypto-js');
require("dotenv").config();

const publicPath = path.join(__dirname, '../../../public');

app.use(express.static(publicPath));

// 루트 엔드포인트 처리
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'html/signupPage/signup.html'));
});
  
  app.get('/info', (req, res) => {
    res.sendFile(path.join(publicPath, 'html/signupPage/info.html'));
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
console.log('hello');
