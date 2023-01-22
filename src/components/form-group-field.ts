export type Option = {
    label: string,
    value: string,
};

type FormGroupFieldProps = {
    labelText: string,
    name: string,
    options: Option[],
    initialValue?: String,
};

class FormGroupField {
    private static count = 0;

    private id: string;

    private props: FormGroupFieldProps;

    public htmlElement: HTMLDivElement;

    public constructor(props: FormGroupFieldProps) {
        FormGroupField.count += 1;
        this.id = `${FormGroupField.name}_${FormGroupField.count}`;
        this.props = props;
        this.htmlElement = document.createElement('div');

        this.renderView();
    }

    public renderView = () => {
        const optionsHtml = this.props.options
        .map(({ label, value }) => `
        <option value="${value}" 
        ${this.props.initialValue === value ? 'selected' : ''}>
        ${label}
        </option>`)
        .join('');

        this.htmlElement.innerHTML = `
        <label for="select-${this.id}">${this.props.labelText}</label>
        <select class="form-select" id="${this.id}" name="${this.props.name}">
          ${optionsHtml}`;
    };

    public updateProps(newProps: Partial<FormGroupFieldProps>) {
        this.props = {
            ...this.props,
            ...newProps,
        };

        this.renderView();
    }
}

export default FormGroupField;
