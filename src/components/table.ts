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
    public htmlElement: HTMLTableElement;

    private props: TableProps<T>;

    private tbody: HTMLTableSectionElement;

    private thead: HTMLTableSectionElement;

    constructor(props: TableProps<T>){

    }
}

export default Table;