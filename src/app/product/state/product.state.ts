import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Product } from "src/app/models/product.models";

export interface ProductState extends EntityState<Product>{}

export const productAdapter = createEntityAdapter<Product>()

export const initialState : ProductState = productAdapter.getInitialState();

export const productSelectors = productAdapter.getSelectors();
