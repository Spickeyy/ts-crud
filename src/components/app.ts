import CarsCollection from '../helpers/cars-collection';
import brands from '../data/brands';
import cars from '../data/cars';
import models from '../data/models';
import stringifyProps from '../helpers/stringify-props';
import Table, { type TableRowData, type TableProps } from './table';
import SelectField, { type Option, type SelectFieldProps } from './select-field';
import type Brand from '../types/brand';
import type CarJoined from '../types/car-joined';
import CarForm from './car-form';

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

const carJoinedToTableRowData = (carJoined: CarJoined): TableRowData => stringifyProps(
  ensureDescriptionProps(carJoined),
);

type CarRowData = ReturnType< typeof carJoinedToTableRowData>;

const ALL_BRAND_ID = '----';
const ALL_BRANDS_TITLE = 'Visi Automobiliai';

class App {
  private htmlElement: HTMLElement;

  private carsCollection: CarsCollection;

  private carsTable: Table<CarRowData>;

  private selectedBrandId: string;

  public constructor(selector: string) {
    const foundElement = document.querySelector<HTMLElement>(selector);

    if (foundElement === null) {
    throw new Error(`Nerastas elementas pagal selektorių "${selector}"`);
    }

    if (!(foundElement instanceof HTMLElement)) {
      throw new Error(`Nerastas HTML elementas pagal selektorių "${selector}"`);
    }

    this.htmlElement = foundElement;
    this.selectedBrandId = ALL_BRAND_ID;
    this.carsCollection = new CarsCollection({
      brands,
      cars,
      models,
    });
    this.carsTable = new Table({
      title: ALL_BRANDS_TITLE,
      columns: {
        id: '#',
        brand: 'Markė',
        year: 'Metai',
        price: 'Kaina €',
        modelId: 'Modelis',
      },
      rowsData: this.carsCollection.all.map(carJoinedToTableRowData),
      onDelete: this.handleCarDelete,
  });
  // TODO: perkelti formą čia (įrašant į savybę), tam, kad ji būtų pasiekiama darant veiksmus
  }

  private handleCarDelete: TableProps<CarRowData>['onDelete'] = (carId) => {
    this.carsCollection.deleteCarById(carId);

    this.update();
  };

  private handleCarChange: SelectFieldProps['onChange'] = (_, brandId) => {
    this.selectedBrandId = brandId;
    this.update();
  };

  public initialize = () => {
    this.htmlElement.innerHTML = '<div class="container"></div>';
    const container = document.createElement('div');
    container.className = 'container my-5 d-flex flex-column gap-3';

    const uxContainer = document.createElement('div');
    uxContainer.className = 'd-flex justify-content-center gap-3 align-items-start';

      const selectField = new SelectField({
      options: [
      { text: ALL_BRANDS_TITLE, value: ALL_BRAND_ID },
        ...brands.map(brandToOption),
    ],
      onChange: this.handleCarChange,
    });

    const carForm = new CarForm({
      title: 'Sukurti automobilį',
      submitBtnText: 'Sukurti',
      values: {
        brand: '',
        model: [],
        price: 0,
        year: 0,
      },
      onSubmit: (formValues) => console.log(formValues),
    });

    uxContainer.append(
      this.carsTable.htmlElement,
      carForm.htmlElement,
    );

    container.append(
      selectField.htmlElement,
      uxContainer,
    );
    this.htmlElement.append(container);
  };

  public update = () => {
    const brandCars = this.selectedBrandId === ALL_BRAND_ID
    ? this.carsCollection.all
    : this.carsCollection.getByBrandId(this.selectedBrandId);

    const brandTitle = this.selectedBrandId === ALL_BRAND_ID
    ? ALL_BRANDS_TITLE
    : this.carsCollection.getBrandById(this.selectedBrandId).title;

    this.carsTable.updateProps({
      rowsData: brandCars.map(carJoinedToTableRowData),
      title: brandTitle,
    });
  };
}

export default App;
