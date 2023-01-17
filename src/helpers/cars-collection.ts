import type Brand from '../types/brand';
import type Model from '../types/model';
import type Car from '../types/car';
import type CarJoined from '../types/car-joined';

type CarsCollectionProps = {
    brands: Brand[],
    cars: Car[],
    models: Model[],
};

class CarsCollection {
    private brands: Brand[];

    private cars: Car[];

    private models: Model[];

    public constructor({
        brands,
        cars,
        models,
    }: CarsCollectionProps) {
        this.brands = JSON.parse(JSON.stringify(brands));
        this.cars = JSON.parse(JSON.stringify(cars));
        this.models = JSON.parse(JSON.stringify(models));
    }

    public get all(): CarJoined[] {
        return this.cars.map(this.joinCar);
    }

    // TODO: make it PRIVATE
    private joinCar = (car: Car): CarJoined => {
        const carModel = this.models.find(
            (model) => model.id === car.modelId,
        );

        const carBrand = this.brands.find(
            (brand) => brand.id === carModel?.brandId,
        );

        return {
            ...car,
            brand: (carBrand && carBrand.title) ?? 'unknown',
            model: (carModel && carModel.title) ?? 'unknown',
          };
    };
}

export default CarsCollection;
