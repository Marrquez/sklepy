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
import { shoppingCarReducer, ShoppingCarState } from './shopping-car.reducer';


export interface State {
  products: ProductState,
  shoppingCar: ShoppingCarState,
  router: RouterReducerState
}

export const reducers: ActionReducerMap<State> = {
  products: productReducer,
  shoppingCar: shoppingCarReducer,
  router: routerReducer
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];

export const selectProductState = (state: State) => state.products;
export const selectShoppingCarState = (state: State) => state.shoppingCar;

export const selectProductList = createSelector(selectProductState,
  (state: ProductState) => state.products);

export const selectShoppingCarList = createSelector(selectShoppingCarState,
  (state: ShoppingCarState) => state.products);
