const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.json());

// 루트 엔드포인트 처리
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/increment', (req, res) => {
    const number = parseInt(req.body.number);
    if (isNaN(number)) {
        res.status(400).send('Invalid number');
    } else {
        const result = number + 1;
        res.send(result.toString());
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
