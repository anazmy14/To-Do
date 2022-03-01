export interface StateType {
  readonly items: Array<ItemType>;
  readonly columns: ColumnsType;
}

export interface ColumnType {
  readonly name: string;
  readonly order: number;
}

export interface ColumnsType {
  readonly [key: string]: ColumnType;
}

export interface ItemType {
  readonly id: string;
  readonly history: Array<string>;
  readonly columnId: string;
  readonly content?: string;
}

export interface ItemActionType {
  readonly type: string;
  readonly payload: ItemType;
}
