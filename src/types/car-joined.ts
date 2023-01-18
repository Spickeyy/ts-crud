import Car from './car';

type CarJoined = Omit<Car, 'modelId'> & {
    id: string,
    price: number,
    year: number,
    brand: string,
    modelId: string,
};

export default CarJoined;
