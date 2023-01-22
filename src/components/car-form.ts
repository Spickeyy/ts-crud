import TextField from './text-field';

class CarForm {
    public htmlElement: HTMLFormElement;

    public constructor() {
        this.htmlElement = document.createElement('form');
        this.initialize();
    }

    public initialize() {
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
        const modelTextField = new TextField({
            labelText: 'Modelis',
            name: 'model',
        });

        this.htmlElement.className = 'd-flex flex-column p-3 border gap-3';
        this.htmlElement.style.width = '450px';
        this.htmlElement.innerHTML = `
        <h2>Automobilio sukūrimas</h2>
        <div><label for="TextField_1" class="d-block">Markė</label><input id="TextField_1"
            class="w-100" name="title"</div>
        <div><label for="TextField_2" class="d-block">Metai</label><input id="TextField_2"
            class="w-100" name="year"</div>
        <div><label for="TextField_3" class="d-block">Kaina</label><input id="TextField_3"
            class="w-100" name="price"</div>
        <div><label for="TextField_4" class="d-block">Modelis</label><input id="TextField_4"
            class="w-100" name="brand"</div><button class="btn btn-outline-success">Sukurti</button>`;
    }
}

export default CarForm;
