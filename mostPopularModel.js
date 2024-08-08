document.addEventListener('DOMContentLoaded', () => {
    const loadCarsButton = document.getElementById('loadCars');
    const addCarForm = document.getElementById('addCarForm');
    const carList = document.getElementById('carList');
    const getMostPopularModelButton = document.getElementById('getMostPopularModel');
    const mostPopularModelDisplay = document.getElementById('mostPopularModel');

    // Function to fetch and display the car list
    function loadCars() {
        fetch('/api/cars')
            .then(response => response.json())
            .then(cars => {
                carList.innerHTML = '';
                cars.forEach(car => {
                    const li = document.createElement('li');
                    li.textContent = `${car.color} ${car.make} ${car.model} (${car.reg_number})`;
                    carList.appendChild(li);
                });
            })
            .catch(error => console.error('Error fetching cars:', error));
    }

    // Function to add a new car
    addCarForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(addCarForm);
        const newCar = {
            color: formData.get('color'),
            make: formData.get('make'),
            model: formData.get('model'),
            reg_number: formData.get('reg_number')
        };

        fetch('/api/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCar)
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                addCarForm.reset();
                loadCars(); // Refresh the car list
            })
            .catch(error => console.error('Error adding car:', error));
    });

    // Function to fetch and display the most popular model
    function getMostPopularModel() {
        fetch('/api/cars/mostpopularmodel')
            .then(response => response.json())
            .then(data => {
                mostPopularModelDisplay.textContent = `Most Popular Model: ${data.model}`;
            })
            .catch(error => console.error('Error fetching most popular model:', error));
    }

    // Event listeners
    loadCarsButton.addEventListener('click', loadCars);
    getMostPopularModelButton.addEventListener('click', getMostPopularModel);
});
