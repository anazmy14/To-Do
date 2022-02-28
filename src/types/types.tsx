export interface State {
  items: Array<Item>;
  columns: Columns;
}

export interface Column {
  name: string;
  order: number;
}

export interface Columns {
  [key: string]: Column;
}

export interface Item {
  id: string;
  history: Array<string>;
  content?: string;
  columnId: string;
}

export interface ItemsAction {
  type: string;
  payload: Item;
}
