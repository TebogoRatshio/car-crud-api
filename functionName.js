function carApp() {
      return {
        cars: [],
        mostPopularModel: null,
        view: 'cars', 
        fetchCars() {
          axios.get('/cars')
            .then(response => {
              this.cars = response.data;
            })
            .catch(error => {
              console.error('Error fetching cars:', error);
            });
        },
        fetchMostPopularModel() {
          axios.get('/mostPopularModel')
            .then(response => {
              this.mostPopularModel = response.data;
            })
            .catch(error => {
              console.error('Error fetching most popular model:', error);
            });
        }
      }
    }

    function mostPopularModel() {
      return {
        selectedModel: 'model',
        fee: '',

        findModel() {
          switch (this.selectedModel) {
            case 'model':
              this.fee = 'Fetching most popular model...';
              break;
            default:
              this.fee = 'Invalid selection';
          }
        }
      };
    }

    document.addEventListener('alpine:init', () => {
      Alpine.data('carApp', carApp);
      Alpine.data('mostPopularModel', mostPopularModel);
    });






























// // Import the data from data.js
// import data from './carData.js';

// function mostPopularModel() {
//     // Ensure the data is loaded
//     if (!data || !Array.isArray(data)) {
//         throw new Error('Data is not available or is not an array');
//     }

//     // Assuming data is an array of objects with a 'model' and 'popularity' field
//     // Find the model with the highest popularity
//     let mostPopular = data.reduce((max, item) => 
//         item.popularity > max.popularity ? item : max, 
//         { popularity: -Infinity }
//     );

//     // Return the most popular model
//     return mostPopular.model;
// }

// // Usage example
// console.log(mostPopularModel());
