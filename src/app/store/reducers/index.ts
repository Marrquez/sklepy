import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { productReducer, ProductState } from './product.reducer';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';


export interface State {
  products: ProductState,
  router: RouterReducerState
}

export const reducers: ActionReducerMap<State> = {
  products: productReducer,
  router: routerReducer
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];

export const selectProductState = (state: State) => state.products;

export const selectProductList = createSelector(selectProductState,
  (state: ProductState) => state.products);
