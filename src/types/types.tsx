export interface StateType {
  items: Array<ItemType>;
  columns: ColumnsType;
}

export interface ColumnType {
  name: string;
  order: number;
}

export interface ColumnsType {
  [key: string]: ColumnType;
}

export interface ItemType {
  id: string;
  history: Array<string>;
  content?: string;
  columnId: string;
}

export interface ItemsActionType {
  type: string;
  payload: ItemType;
}
