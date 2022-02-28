import { ADD_ITEM, REMOVE_ITEM, EDIT_ITEM, CHANGE_ITEM_COLUMN } from "./types";
import { Item } from "../types/types";

export const addItem = (item: Item) => {
  return {
    type: ADD_ITEM,
    payload: item,
  };
};
export const changeItemColumn = (item: Item) => {
  return {
    type: CHANGE_ITEM_COLUMN,
    payload: item,
  };
};

export const editItem = (item: Item) => {
  return {
    type: EDIT_ITEM,
    payload: item,
  };
};

export const removeItem = (item: Item) => {
  return {
    type: REMOVE_ITEM,
    payload: item,
  };
};
