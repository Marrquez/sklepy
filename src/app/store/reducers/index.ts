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
import { sellsReducer, SellsState } from './sells.reducer';
import { transactionsReducer, TransactionsState } from './transactions.reducer';


export interface State {
  products: ProductState,
  shoppingCar: ShoppingCarState,
  sells: SellsState,
  transactions: TransactionsState,
  router: RouterReducerState
}

export const reducers: ActionReducerMap<State> = {
  products: productReducer,
  shoppingCar: shoppingCarReducer,
  sells: sellsReducer,
  transactions: transactionsReducer,
  router: routerReducer
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];

export const selectProductState = (state: State) => state.products;
export const selectShoppingCarState = (state: State) => state.shoppingCar;
export const selectSellsState = (state: State) => state.sells;
export const selectTransactionsState = (state: State) => state.transactions;

export const selectProductList = createSelector(selectProductState,
  (state: ProductState) => state.products);

export const selectShoppingCarList = createSelector(selectShoppingCarState,
  (state: ShoppingCarState) => state.products);

export const selectSellsList = createSelector(selectSellsState,
  (state: SellsState) => state.sells);

export const selectOpenCloseState = createSelector(selectSellsState,
  (state: SellsState) => state.open);

export const selectTransactionsList = createSelector(selectTransactionsState,
  (state: TransactionsState) => state.transactions);