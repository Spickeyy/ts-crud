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
    private privateBrands: Brand[];

    private privateCars: Car[];

    private privateModels: Model[];

    public constructor({
        brands,
        cars,
        models,
    }: CarsCollectionProps) {
        this.privateBrands = JSON.parse(JSON.stringify(brands));
        this.privateCars = JSON.parse(JSON.stringify(cars));
        this.privateModels = JSON.parse(JSON.stringify(models));
    }

    public get all(): CarJoined[] {
        return this.privateCars.map(this.joinCar);
    }

    public get cars(): Car[] {
        return JSON.parse(JSON.stringify(this.privateCars));
    }

    // TODO: make it PRIVATE
    private joinCar = (car: Car): CarJoined => {
        const carModel = this.privateModels.find(
            (modelId) => modelId.id === car.modelId,
        );

        const carBrand = this.privateBrands.find(
            (brand) => brand.id === carModel?.brandId,
        );

        return {
            ...car,
            brand: (carBrand && carBrand.title) ?? 'unknown',
            modelId: (carModel && carModel.title) ?? 'unknown',
          };
    };

    public getByBrandId = (brandId: string): CarJoined[] => {
        const brandModelsIds = this.privateModels
        .filter((model) => model.brandId === brandId)
        .map((model) => model.id);

        const joinedCars = this.privateCars
        .filter((car) => brandModelsIds
        .includes(car.modelId))
        .map(this.joinCar);

        console.log(joinedCars);

        return joinedCars;
    };
}

export default CarsCollection;
