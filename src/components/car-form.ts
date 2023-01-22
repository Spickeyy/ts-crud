import TextField from './text-field';
import FormGroupField from './form-group-field';

class CarForm {
    public htmlElement: HTMLFormElement;

    public constructor() {
        this.htmlElement = document.createElement('form');
        this.initialize();
    }

    public initialize() {
        const formTitleHtmlElement = document.createElement('h2');
        formTitleHtmlElement.innerText = 'Automobilio sukūrimas';

        const brandTextField = new TextField({
            labelText: 'Markė',
            name: 'title',
        });
        const yearTextField = new TextField({
            labelText: 'Metai',
            name: 'year',
        });
        const priceTextField = new TextField({
            labelText: 'Kaina',
            name: 'price',
        });
        const modelsFormGroupField = new FormGroupField({
            labelText: 'Modeliai',
            name: 'models',
            options: [
                { label: 'Pasirikimas1', value: 'idRaktas1' },
                { label: 'Pasirikimas2', value: 'idRaktas2' },
                { label: 'Pasirikimas3', value: 'idRaktas3' },
                { label: 'Pasirikimas4', value: 'idRaktas4' },
            ],
        });

        const submitBtn = document.createElement('button');
        submitBtn.className = 'btn btn-outline-success';
        submitBtn.innerText = 'Sukurti';
        submitBtn.setAttribute('type', 'submit');

        this.htmlElement.className = 'd-flex flex-column p-3 border gap-3';
        this.htmlElement.style.width = '450px';
        this.htmlElement.append(
            formTitleHtmlElement,
            brandTextField.htmlElement,
            yearTextField.htmlElement,
            priceTextField.htmlElement,
            modelsFormGroupField.htmlElement,
            submitBtn,
        );
    }
}

export default CarForm;
