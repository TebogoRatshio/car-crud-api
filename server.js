import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const cars = [
  { "color": "white", "make": "Volkswagen", "model": "Polo", "reg_number": "CL 61045" },
  { "color": "red", "make": "Toyota", "model": "Tazz", "reg_number": "CY 16875" },
  { "color": "orange", "make": "Nissan", "model": "Juke", "reg_number": "CK 32655" },
  { "color": "orange", "make": "Ford", "model": "EcoSport", "reg_number": "CL 11318" },
  { "color": "white", "make": "Nissan", "model": "Micra", "reg_number": "CJ 16103" },
  { "color": "orange", "make": "Nissan", "model": "Juke", "reg_number": "CL 42789" },
  { "color": "blue", "make": "Volkswagen", "model": "Jetta", "reg_number": "CA 46977" },
  { "color": "white", "make": "Volkswagen", "model": "Polo", "reg_number": "CY 25661" },
  { "color": "white", "make": "Nissan", "model": "Micra", "reg_number": "CY 35475" },
  { "color": "white", "make": "Toyota", "model": "Corolla", "reg_number": "CY 54886" },
  { "color": "white", "make": "Toyota", "model": "Hilux", "reg_number": "CJ 16455" },
  { "color": "orange", "make": "Toyota", "model": "Corolla", "reg_number": "CK 57166" },
  { "color": "orange", "make": "Ford", "model": "Fiesta", "reg_number": "CL 77790" },
  { "color": "blue", "make": "Nissan", "model": "Juke", "reg_number": "CY 98904" },
  { "color": "white", "make": "Ford", "model": "Ranger", "reg_number": "CF 75599" },
  { "color": "red", "make": "Toyota", "model": "Corolla", "reg_number": "CA 5510" },
  { "color": "blue", "make": "Ford", "model": "Focus", "reg_number": "CF 75586" },
  { "color": "orange", "make": "Toyota", "model": "Tazz", "reg_number": "CA 46137" },
  { "color": "orange", "make": "Ford", "model": "Ranger", "reg_number": "CK 22692" },
  { "color": "red", "make": "Toyota", "model": "Corolla", "reg_number": "CF 33543" },
  { "color": "red", "make": "Volkswagen", "model": "Touran", "reg_number": "CA 94890" },
  { "color": "orange", "make": "Toyota", "model": "Tazz", "reg_number": "CY 82252" },
  { "color": "blue", "make": "Toyota", "model": "Yaris", "reg_number": "CL 9538" },
  { "color": "white", "make": "Nissan", "model": "Juke", "reg_number": "CF 62002" },
  { "color": "orange", "make": "Ford", "model": "Fiesta", "reg_number": "CJ 67577" },
  { "color": "blue", "make": "Ford", "model": "Ranger", "reg_number": "CA 77852" },
  { "color": "orange", "make": "Toyota", "model": "Hilux", "reg_number": "CY 52435" },
  { "color": "blue", "make": "Toyota", "model": "Corolla", "reg_number": "CL 76173" },
  { "color": "red", "make": "Toyota", "model": "Tazz", "reg_number": "CL 38315" },
  { "color": "orange", "make": "Toyota", "model": "Corolla", "reg_number": "CK 41166" }
];


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

function findMostPopularModel(cars) {
  const modelCount = cars.reduce((count, car) => {
    count[car.model] = (count[car.model] || 0) + 1;
    return count;
  }, {});

  let mostPopularModel = null;
  let maxCount = 0;

  for (const model in modelCount) {
    if (modelCount[model] > maxCount) {
      maxCount = modelCount[model];
      mostPopularModel = model;
    }
  }

  return mostPopularModel;
}

app.get('/api/cars', (req, res) => {
  res.json(cars);
});

app.get('/api/cars/mostpopularmodel', (req, res) => {
  const mostPopularModel = findMostPopularModel(cars);
  res.json({ model: mostPopularModel });
});

app.post('/api/cars', (req, res) => {
  const newCar = req.body;

  if (!newCar.color || !newCar.make || !newCar.model || !newCar.reg_number) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  cars.push(newCar);
  res.status(201).json({ message: 'Car added successfully', car: newCar });
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
