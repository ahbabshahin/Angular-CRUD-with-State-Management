import { categoryReducer } from './state/categoryState/category.reducer';
import { categoryStateName } from './state/categoryState/category.selector';
import { productReducer } from './state/product.reducer';
import { productStateName } from './state/product.selector';

export const Reducer = {
[productStateName]: productReducer,
[categoryStateName]: categoryReducer
}
