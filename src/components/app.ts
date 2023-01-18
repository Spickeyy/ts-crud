import CarsCollection from '../helpers/cars-collection';
import brands from '../data/brands';
import cars from '../data/cars';
import models from '../data/models';
import Table from './table';

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
    console.log(this.carsCollection);
  }

  public initialize = () => {
    this.htmlElement.innerHTML = '<div class="container"></div>';
    const container = document.createElement('div');
    container.className = 'container my-5';

    const table = new Table({
      title: 'lentelės pavadinimas',
      columns: {
          id: 'Id',
          col1: 'stulpelis1',
          col2: 'stulpelis2',
      },
      rowsData: [{
          id: '1-Id',
          col1: '1-stulpelis1',
          col2: '1-stulpelis2',
      }, {
          id: '2-Id',
          col1: '2-stulpelis1',
          col2: '2-stulpelis2',
      }, {
          id: '3-Id',
          col1: '3-stulpelis1',
          col2: '3-stulpelis2',
      }],
  });

    container.append(table.htmlElement);
    this.htmlElement.append(container);
  };
}

export default App;
