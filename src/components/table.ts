import getPropCount from "../helpers/get-prop-count";

type TableRowData = {
    id: string,
    [key: string]: string,
};

type TableProps<Type extends TableRowData> = {
    title: string,
    columns: Type,
    rowsData: Type[],
};

class Table <T extends TableRowData> {
    public static checkColumnsCompatability<T extends TableRowData>(
        columns: T,
        rowsData: T[],
        ): boolean {
        return rowsData.every((rowData) => getPropCount(rowData) === getPropCount(columns));
    }

    public htmlElement: HTMLTableElement;

    private props: TableProps<T>;

    private tbody: HTMLTableSectionElement;

    private thead: HTMLTableSectionElement;

    public constructor(props: TableProps<T>) {
        if (!Table.checkColumnsCompatability(props.columns, props.rowsData)) {
            throw new Error('Nesutampa stulpelių skaičių su eilučių duomenys');
        }

        this.props = props;
        this.htmlElement = document.createElement('table');
        this.tbody = document.createElement('tbody');
        this.thead = document.createElement('thead');

        this.initialize();
    }

    public initializeHead = () => {
        const columnsNames = Object.values(this.props.columns);
        const columnsHtmlStr = columnsNames
            .map((name) => `<th>${name}</th>`)
            .join('');
        this.thead.innerHTML = `<tr>${columnsHtmlStr}</tr>`;
    };

    public initializeBody = () => {
        this.props.rowsData.forEach((rowData) => {
            const columnsNames = Object.values(rowData);
            const columnsHtmlStr = columnsNames
                .map((name) => `<td>${name}</td>`)
                .join('');

            this.tbody.innerHTML += `<tr>${columnsHtmlStr}</tr>`;
        });
    };

    public initialize = () => {
        this.initializeHead();
        this.initializeBody();

        this.htmlElement.className = 'table table-striped';
        this.htmlElement.append(
            this.thead,
            this.tbody,
        );
    };
}

export default Table;