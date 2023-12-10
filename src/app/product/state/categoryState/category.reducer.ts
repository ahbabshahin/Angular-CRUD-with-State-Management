import { createReducer, on } from '@ngrx/store';
import { categoryAdapter, initialState } from './category.state';
import { categoryFetchSuccess } from './category.actions';

const _categoryReducer = createReducer(
  initialState,
  on(categoryFetchSuccess, (state, action) => {
    let cat = [];
    for (let i = 0; i < action.category.length; i++) {
      cat[i] = {id: i, value:action.category[i]};
    }

    return categoryAdapter.setAll(cat, state);
  })
);

export function categoryReducer(state: any, action: any) {
  return _categoryReducer(state, action);
}
