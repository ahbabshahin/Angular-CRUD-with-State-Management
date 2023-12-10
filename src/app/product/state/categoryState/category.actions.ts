import { createAction, props } from "@ngrx/store";

export const categoryFetchStart = createAction('[Category Comp] Category Fetch Start');
export const categoryFetchSuccess = createAction('[Category Comp] Category fetch Success', props<{category:any}>());
