import { CATEGORIES_ACTION_TYPES } from "./categories.type";

const INITAL_STATE = {
  categoriesMap: [],
};

export const categoriesReducer = (state = INITAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP:
      return { ...state, categoriesMap: payload };
    default:
      return state;
  }
};