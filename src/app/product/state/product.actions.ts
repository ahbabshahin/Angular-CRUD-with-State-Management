import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/models/product.models";

// data fetch actions
export const getDataStart = createAction('[Product Page] Get Data Start');
export const getDataSuccess = createAction('[Product Page] Get Data Success', props<{product: Product[]}>());
export const getSingleViewStart = createAction('[View Page] View Start', props<{id:string}>());
export const getSingleViewSuccess = createAction('[View Page] View Success', props<{product: Product}>());

// data post actions
export const addDataStart = createAction('[Form Page] Add data start', props<{product: string}>());
export const addDataSuccess = createAction('[Form Page] Add data Success', props<{product: Product}>());

// data delete actions
export const deleteDataStart = createAction('[Product Page] Delete Data Start', props<{id:number}>());
export const deleteDataSuccess = createAction('[Product Page] Delete Data Success', props<{id:number}>());

// data fecth from category actions
export const getDataFromCategoryStart = createAction('[Category Page] Get data from Category Start', props<{categor: string}>());
export const getDataFromCategorySuccess = createAction('[Category Page] Get data from Category Success', props<{product: Product[]}>());

// data fetch from search actions
export const searchDataStart = createAction('[Search Page] Search Data Start', props<{searchText: string}>());
export const serachDataSuccess = createAction('[Search Page] Search Data Success', props<{product:Product[]}>());

// data update actions
export const editDataStart = createAction('[Edit Page] Edit data Start', props<{id:number,product: string}>());
export const editDataSuccess = createAction('[Edit Page] Edit data Success', props<{product: Update<Product>}>());



