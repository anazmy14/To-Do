import {
  ADD_ITEM,
  REMOVE_ITEM,
  EDIT_ITEM,
  CHANGE_ITEM_COLUMN,
} from "../actions/types";
import { State, ItemsAction } from "../types/types";

export default function itemReducer(state: State, action: ItemsAction) {
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
                  `moved to ${state.columns[action.payload.columnId].name}`,
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
                  `changed to "${action.payload.content}"`,
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
