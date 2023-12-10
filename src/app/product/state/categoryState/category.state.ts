import { Dictionary, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Category } from 'src/app/models/category.models';

export interface CategoryState extends EntityState<any>{}

export const categoryAdapter = createEntityAdapter<any>();

export const initialState: CategoryState = categoryAdapter.getInitialState();

export const categorySelectors = categoryAdapter.getSelectors();
