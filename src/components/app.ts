import CarsCollection from '../helpers/cars-collection';
import brands from '../data/brands';
import cars from '../data/cars';
import models from '../data/models';
import stringifyProps from '../helpers/stringify-props';
import Table, { type TableRowData } from './table';
import SelectField, { type Option } from './select-field';
import type Brand from '../types/brand';
import type CarJoined from '../types/car-joined';

const brandToOption = ({ id, title }: Brand): Option => ({
  value: id,
  text: title,
});

const ensureDescriptionProps = ({
  brand,
  ...rest
}: CarJoined): Required<CarJoined> => ({
  ...rest,
  brand: brand ?? '',
});

const carJoinedToTableRowData = (joinedCar: CarJoined): TableRowData => stringifyProps(
  ensureDescriptionProps(joinedCar),
);

const ALL_CATEGORIES_ID = '----';
const ALL_CATEGORIES_TITLE = 'Visi Produktai';

class App {
  private htmlElement: HTMLElement;

  private carsCollection: CarsCollection;

  public constructor(selector: string) {
    const foundElement = document.querySelector<HTMLElement>(selector);

    if (foundElement === null) {
    throw new Error(`Nerastas elementas pagal selektorių "${selector}"`);
    }

    if (!(foundElement instanceof HTMLElement)) {
      throw new Error(`Nerastas HTML elementas pagal selektorių "${selector}"`);
    }

    this.htmlElement = foundElement;
    this.carsCollection = new CarsCollection({
      brands,
      cars,
      models,
    });
  }

  public initialize = () => {
    this.htmlElement.innerHTML = '<div class="container"></div>';
    const container = document.createElement('div');
    container.className = 'container my-5 d-flex flex-column gap-3';
    const table = new Table({
      title: ALL_CATEGORIES_TITLE,
      columns: {
        id: '#',
        brand: 'Markė',
        year: 'Metai',
        price: 'Kaina €',
        modelId: 'Modelis',
      },
      rowsData: this.carsCollection.all.map(carJoinedToTableRowData),
  });

      const selectField = new SelectField({
      options: [
      { text: ALL_CATEGORIES_TITLE, value: ALL_CATEGORIES_ID },
        ...brands.map(brandToOption),
    ],
      onChange: (_, brandId, { text: brandTitle }) => {
        const brandCars = brandId === ALL_CATEGORIES_ID
        ? this.carsCollection.all
        : this.carsCollection.getByBrandId(brandId);

        table.updateProps({
          rowsData: brandCars.map(carJoinedToTableRowData),
          title: brandTitle,
        });
      },
    });

    container.append(
      selectField.htmlElement,
      table.htmlElement,
      );
    this.htmlElement.append(container);
  };
}

export default App;
