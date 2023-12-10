import { createReducer, on } from "@ngrx/store";
import { initialState, productAdapter } from "./product.state";
import { addDataSuccess, deleteDataSuccess, editDataSuccess, getDataFromCategorySuccess, getDataSuccess, getSingleViewSuccess, serachDataSuccess } from "./product.actions";

const _productReducer = createReducer(
  initialState,
  on(getDataSuccess, (state, action) =>{
    // console.log(action);

    return productAdapter.setAll(action.product, state)
  }),
  on(getSingleViewSuccess, (state, action) =>{
    // console.log(action.product);
    return productAdapter.setOne(action.product, state);
  }),

  on(addDataSuccess, (state, action) =>{
    return productAdapter.addOne(action.product, state);
  }),

  on(deleteDataSuccess, (state, action) =>{
    return productAdapter.removeOne(action.id, state);
  }),

  on(getDataFromCategorySuccess, (state,action) =>{
    return productAdapter.setAll(action.product, state);
  }),

  on(serachDataSuccess, (state, action) =>{
    return productAdapter.setAll(action.product, state);
  }),

  on(editDataSuccess, (state, action) =>{
    return productAdapter.updateOne(action.product, state)
  })

  );

export function productReducer(state:any, action:any){
  return _productReducer(state, action);
}

