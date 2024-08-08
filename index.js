// src/index.js
import express from 'express';
import { carData } from './carData.js';
import path from 'path';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/cars', (req, res) => {
  res.json(carData);
});

app.get('/mostPopularModel', (req, res) => {
  const modelCount = {};
  carData.forEach(car => {
    if (modelCount[car.model]) {
      modelCount[car.model]++;
    } else {
      modelCount[car.model] = 1;
    }
  });

  const mostPopularModel = Object.keys(modelCount).reduce((a, b) => modelCount[a] > modelCount[b] ? a : b);
  res.json({ model: mostPopularModel, count: modelCount[mostPopularModel] });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
