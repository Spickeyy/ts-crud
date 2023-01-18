export type Option = {
    text: string,
    value: string,
};

type SelectFieldProps = {
    options: Option[],
};

class SelectField {
    public htmlElement: HTMLElement;

    private options: SelectFieldProps['options'];

    public constructor({ options }: SelectFieldProps) {
        this.htmlElement = document.createElement('select');
        this.options = options;
        this.initialize();
    }

    private initialize() {
        const optionsStr = this.options
        .map(({ value, text }) => `<option value="${value}">${text}</option>`)
        .join('');

        this.htmlElement.className = 'form-select';
        this.htmlElement.innerHTML = optionsStr;
    }
}

export default SelectField;
