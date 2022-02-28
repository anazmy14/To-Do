import { ADD_ITEM, REMOVE_ITEM, EDIT_ITEM, SWAP_ITEMS ,CHANGE_ITEM_COLUMN } from "./actionTypes";
import { ItemType } from "../types/types";

export const addItem = (item: ItemType) => {
  return {
    type: ADD_ITEM,
    payload: item,
  };
};
export const changeItemColumn = (item: ItemType) => {
  return {
    type: CHANGE_ITEM_COLUMN,
    payload: item,
  };
};

export const editItem = (item: ItemType) => {
  return {
    type: EDIT_ITEM,
    payload: item,
  };
};

export const swapItems = (item: ItemType) => {
  return {
    type: SWAP_ITEMS,
    payload: item,
  };
};


export const removeItem = (item: ItemType) => {
  return {
    type: REMOVE_ITEM,
    payload: item,
  };
};
