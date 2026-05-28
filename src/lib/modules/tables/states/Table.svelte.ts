class TableColumn {
  constructor(
    public id: string,
    public name: string,
    public values: number[]) {
  }

  addRow() {
    this.values = [...this.values, 0]
  }
  static createNew(numberOfRows: number) {
    return new TableColumn(crypto.randomUUID(), 'UNtitled', Array.from({ length: numberOfRows}, () => 0))
  }
}

export class TableState {
  numberOfRows: number = $state(1);
  columns: TableColumn[] = $state([
    TableColumn.createNew(this.numberOfRows),
    TableColumn.createNew(this.numberOfRows),
    TableColumn.createNew(this.numberOfRows)
  ]);

  constructor() {

  }

  addRow() {
    for (const column of this.columns) { column.addRow() }
    this.numberOfRows++
    for (const column of this.columns) { column.addRow() }
    this.numberOfRows++
    for (const column of this.columns) { column.addRow() }
    this.numberOfRows++
    for (const column of this.columns) { column.addRow() }
    this.numberOfRows++
  }

  addColumn() {
    this.columns.push(TableColumn.createNew(this.numberOfRows))
  }
}
