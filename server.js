import express from 'express';
const app = express();
const port = 3000;


const cars = [
  { reg_number: 'ABC123', make: 'Toyota', model: 'Corolla', color: 'Blue' },
  { reg_number: 'XYZ456', make: 'Honda', model: 'Civic', color: 'Red' }
];

const mostPopularModel = {
  model: 'Corolla',
  count: 10
};

// Endpoint to get car list
app.get('/api/cars', (req, res) => {
  res.json(cars);
});

// Endpoint to get the most popular model
app.get('/api/mostPopularModel', (req, res) => {
  res.json(mostPopularModel);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
