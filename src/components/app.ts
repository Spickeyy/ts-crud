import CarsCollection from '../helpers/cars-collection';
import brands from '../data/brands';
import cars from '../data/cars';
import models from '../data/models';
import stringifyProps from '../helpers/stringify-props';
import Table from './table';
import SelectField, { type Option } from './select-field';
import type Brand from '../types/brand';

const brandToOption = ({ id, title }: Brand): Option => ({
  value: id,
  text: title,
});

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

    const selectField = new SelectField({
      options: brands.map(brandToOption),
      onChange: (_, brandId) => {
        console.log(`Pasikeitė kategorija su id: "${brandId}"`);
      },
    });

    const table = new Table({
      title: 'Visi Automobiliai',
      columns: {
        id: '#',
        brand: 'Markė',
        year: 'Metai',
        price: 'Kaina €',
        modelId: 'Modelis',
      },
      rowsData: this.carsCollection.all.map(stringifyProps),
  });

    container.append(
      selectField.htmlElement,
      table.htmlElement,
      );
    this.htmlElement.append(container);
  };
}

export default App;
