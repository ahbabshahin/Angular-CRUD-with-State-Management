import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CategoryState, categorySelectors } from "./category.state";

export const categoryStateName = 'category';

export const getCategoryState = createFeatureSelector<CategoryState>(categoryStateName);

export const getCategory = createSelector(getCategoryState, categorySelectors.selectAll);



