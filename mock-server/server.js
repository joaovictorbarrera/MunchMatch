const express = require('express');
const path = require('path')
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

const { mockMealData, mockResultData } = require('./mockData.js')

app.use(express.json());

app.use(express.static(path.join("../client", 'public')));

app.get('/results', (req, res) => {
    const { resultID } = req.query;
    if (!resultID) return res.status(400).json({error: true})
    if (resultID != mockResultData.resultID) return res.status(404).json({error: true})
    return res.json({ mockResultData });
});

app.post('/results', (req, res) => {
    console.log(req.body)
    return res.json(mockResultData);
});

app.post('/suggestions', (req, res) => {
    console.log(req.body)
    return res.json(mockMealData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
