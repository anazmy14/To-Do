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
  columnId: string;
  content?: string;
  currentIndex : number
  indexToMove: number 
}

export interface ItemActionType {
  type: string;
  payload: ItemType;
 }
