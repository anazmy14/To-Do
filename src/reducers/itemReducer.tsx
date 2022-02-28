import {
  ADD_ITEM,
  REMOVE_ITEM,
  EDIT_ITEM,
  CHANGE_ITEM_COLUMN,
} from "../actions/actionTypes";
import { StateType, ItemsActionType } from "../types/types";

export default function itemReducer(state: StateType, action: ItemsActionType) {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case CHANGE_ITEM_COLUMN:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                ...action.payload,
                history: [
                  `Moved to ${state.columns[action.payload.columnId].name}`,
                  ...item.history,
                ],
              }
            : item
        ),
      };

    case EDIT_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                ...action.payload,
                history: [
                  `Changed to "${action.payload.content}"`,
                  ...item.history,
                ],
              }
            : item
        ),
      };

    case REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    default:
      return state;
  }
}
