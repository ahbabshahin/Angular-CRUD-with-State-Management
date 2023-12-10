import { RouterReducerState, routerReducer } from "@ngrx/router-store";
import { SharedReducer } from "../shared/shared.reducer";
import { sharedStateName } from "../shared/shared.selector";
import { SharedState } from "../shared/shared.state";
import { productStateName } from "../product/state/product.selector";
import { productReducer } from "../product/state/product.reducer";
import { categoryStateName } from "../product/state/categoryState/category.selector";
import { categoryReducer } from "../product/state/categoryState/category.reducer";

export interface AppState {
  [sharedStateName]: SharedState;
  router:RouterReducerState
}
export const appReducer = {
  [sharedStateName]: SharedReducer,
  [productStateName]:productReducer, [categoryStateName]: categoryReducer,
  router:routerReducer
}
