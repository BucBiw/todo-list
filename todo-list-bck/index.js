import express from 'express';


const app = new express();
const PORT = 4000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});