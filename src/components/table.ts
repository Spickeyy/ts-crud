import getPropCount from '../helpers/get-prop-count';

export type TableRowData = {
    id: string,
    [key: string]: string,
};

export type TableProps<Type extends TableRowData> = {
    title: string,
    columns: Type,
    rowsData: Type[],
    onDelete: (id: string) => void
};

class Table <T extends TableRowData> {
    public static checkColumnsCompatability<T extends TableRowData>(
        columns: T,
        rowsData: T[],
        ): boolean {
        return rowsData.every((rowData) => getPropCount(rowData) === getPropCount(columns));
    }

    private tbody: HTMLTableSectionElement;

    private thead: HTMLTableSectionElement;

    private props: TableProps<T>;

    public htmlElement: HTMLTableElement;

    public constructor(props: TableProps<T>) {
        if (!Table.checkColumnsCompatability(props.columns, props.rowsData)) {
            throw new Error('Nesutampa stulpelių skaičių su eilučių duomenys');
        }

        this.props = props;
        this.htmlElement = document.createElement('table');
        this.tbody = document.createElement('tbody');
        this.thead = document.createElement('thead');

        this.initialize();
        this.renderView();
    }

    // Initialize metode atliekami veiksmai nepriklausantys nuo PROPS
    private initialize = () => {
        this.thead.className = 'bg-dark text-white';
        this.htmlElement.className = 'table table-striped';
        this.htmlElement.append(
            this.thead,
            this.tbody,
        );
    };

    private renderHeadView = () => {
        const columnsNames = Object.values(this.props.columns);
        const columnsHtmlStr = `${columnsNames
            .map((name) => `<th>${name}</th>`)
            .join('')}<th></th>`;

        this.thead.innerHTML = `
        <tr class="text-center h4">
            <th colspan="${columnsNames.length + 1}">${this.props.title}</th>
        </tr>
        <tr>${columnsHtmlStr}</tr>`;
    };

    private renderBodyView = () => {
        this.tbody.innerHTML = '';
        const keys = Object.keys(this.props.columns);

        this.props.rowsData.forEach((rowData) => {
            const tr = document.createElement('tr');
            tr.innerHTML = keys
            .map((key) => `<td>${rowData[key]}</td>`)
            .join('');

            const delBtn = document.createElement('button');
            delBtn.innerHTML = '⌫';
            delBtn.className = 'btn btn-danger btn-sm';
            delBtn.addEventListener('click', () => {
                this.props.onDelete(rowData.id);
            });

            const lastTd = document.createElement('td');
            lastTd.append(delBtn);
            tr.append(lastTd);
            this.tbody.append(tr);
        });
    };

    // Atliekami veiksmai kurie priklauso nuo PROPS
    private renderView = () => {
        this.renderHeadView();
        this.renderBodyView();
    };

    public updateProps = (newProps: Partial<TableProps<T>>) => {
        this.props = {
            ...this.props,
            ...newProps,
        };

        this.renderView();
    };
}

export default Table;
