import TextField from './text-field';
import FormGroupField from './form-group-field';

export type FormValues = {
    brand: string,
    model: string,
    price: string,
    year: string,
  };

export type CarFormProps = {
    title: string,
    values: FormValues,
    submitBtnText: string,
    isEdited: boolean,
    onSubmit: (values: FormValues) => void,
  };

class CarForm {
    private props: CarFormProps;

    private brandFormGroupField: FormGroupField;

    private yearTextField: TextField;

    private priceTextField: TextField;

    private modelsFormGroupField: FormGroupField;

    private titleHtmlElement: HTMLHeadingElement;

    private submitBtnHtmlElelemnt: HTMLButtonElement;

    public htmlElement: HTMLFormElement;

    public constructor(props: CarFormProps) {
        this.htmlElement = document.createElement('form');

        this.props = props;

        this.brandFormGroupField = new FormGroupField({
            labelText: 'Markė',
            name: 'brand',
            options: [
                { label: 'Subaru', value: 'idRaktas1' },
                { label: 'BMW', value: 'idRaktas2' },
                { label: 'Opel', value: 'idRaktas3' },
                { label: 'Volvo', value: 'idRaktas4' },
            ],
        });
        this.yearTextField = new TextField({
            labelText: 'Metai',
            name: 'year',
            initialValue: String(props.values.year),
        });
        this.priceTextField = new TextField({
            labelText: 'Kaina',
            name: 'price',
            initialValue: String(props.values.price),
        });
        this.modelsFormGroupField = new FormGroupField({
            labelText: 'Modelis',
            name: 'model',
            options: [
                { label: 'Pasirikimas1', value: 'idRaktas1' },
                { label: 'Pasirikimas2', value: 'idRaktas2' },
                { label: 'Pasirikimas3', value: 'idRaktas3' },
                { label: 'Pasirikimas4', value: 'idRaktas4' },
            ],
        });

        this.titleHtmlElement = document.createElement('h2');
        this.submitBtnHtmlElelemnt = document.createElement('button');

        this.initialize();
        this.renderView();
    }

    private handleSubmit = (event: Event) => {
        event.preventDefault();

        const formData = new FormData(this.htmlElement);

        const brand = formData.get('brand') as string | null;
        const model = formData.get('model') as string | null;
        const price = formData.get('price') as string | null;
        const year = formData.get('year') as string | null;

        if (!(brand && price && model && year)) {
            throw new Error('Bad Form Data');
          }

        // turetu buti validacija.
        const formValues: FormValues = {
            brand,
            model,
            price,
            year,
        };

        this.props.onSubmit(formValues);
    };

    private renderView() {
        const {
    values: {
            brand,
            year,
            price,
            model,
        },
        } = this.props;

        this.titleHtmlElement.innerHTML = this.props.title;
        this.submitBtnHtmlElelemnt.innerText = this.props.submitBtnText;

        this.brandFormGroupField.updateProps({ initialValue: brand });
        this.modelsFormGroupField.updateProps({ initialValue: model });

        this.priceTextField.updateProps({ initialValue: String(price) });
        this.yearTextField.updateProps({ initialValue: String(year) });
    }

    public initialize() {
        this.submitBtnHtmlElelemnt.className = 'btn btn-outline-success';
        this.submitBtnHtmlElelemnt.setAttribute('type', 'submit');

        this.htmlElement.className = 'd-flex flex-column p-3 border gap-3';
        this.htmlElement.style.width = '450px';
        this.htmlElement.append(
            this.titleHtmlElement,
            this.brandFormGroupField.htmlElement,
            this.yearTextField.htmlElement,
            this.priceTextField.htmlElement,
            this.modelsFormGroupField.htmlElement,
            this.submitBtnHtmlElelemnt,
        );

        this.htmlElement.addEventListener('submit', this.handleSubmit);
    }

    public updateProps(newProps: Partial<CarFormProps>) {
        this.props = {
            ...this.props,
            ...newProps,
        };

        this.renderView();
    }
}

export default CarForm;
