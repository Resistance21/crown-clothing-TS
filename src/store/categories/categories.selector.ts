import { createSelector } from "reselect";
import { CatergoriesState } from "./categories.reducer";
import { Category, CatergoryMap } from "./categories.type";
import { RootState } from "../store";

const selectCategoryReducer = (state: RootState): CatergoriesState =>
  state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => {
    return categoriesSlice.categories;
  }
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    return categories.reduce((acc: CatergoryMap, category: Category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);

export const selectCategoriesLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => {
    return categoriesSlice.isLoading;
  }
);
