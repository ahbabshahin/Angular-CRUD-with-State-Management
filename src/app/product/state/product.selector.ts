import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState, productAdapter, productSelectors } from "./product.state";
import { getCurrentRoute } from "src/app/shared/router/router.selector";
import { RouterStateUrl } from "src/app/shared/router/custom-serializer";

export const productStateName = 'products';

const getProductState = createFeatureSelector<ProductState>(productStateName)

export const getProduct = createSelector(getProductState, productSelectors.selectAll);

export const getProductEntities = createSelector(getProductState, productSelectors.selectEntities);

export const getTotalProdect = createSelector(getProductState, productSelectors.selectTotal);

export const getSingleProduct = createSelector(getProductEntities,getCurrentRoute,
(entities, route: RouterStateUrl) => entities[route.params['id']]);

export const getProductById = createSelector(
  getProductEntities,
  getCurrentRoute,
  (products, route: RouterStateUrl) =>{
    // console.log(products);
  return products? products[route.params['id']]:null;
})


