import App from './components/app';
import CarsCollection from './helpers/cars-collection';
import brands from './data/brands';
import cars from './data/cars';
import models from './data/models';

const carsCollection = new CarsCollection({
    brands,
    cars,
    models,
});

console.log(carsCollection);

const app = new App('#root');
app.initialize();
