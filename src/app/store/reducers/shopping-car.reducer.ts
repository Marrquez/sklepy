import { createReducer, on } from '@ngrx/store';
import { AddProductToCar, EmptyShoppingCar, RemoveProductFromCar, ShoppingCarActions } from '../actions/shopping-car.actions';
import { Product } from '../../models/product.model';

export const shoppingCarFeatureKey = 'shoppingCar';

export interface ShoppingCarState {
  products: Array<Product>
}

export const initialState: ShoppingCarState = {
  products: []
};

export const shoppingCarReducer = createReducer(
  initialState,
  on(AddProductToCar, (state, action) => {
    const products = [...state.products];
    const productIndex = state.products.findIndex((p: Product) => p.id === action.product.id);
    
    if(productIndex !== -1) {
      products[productIndex] = {...products[productIndex], units: products[productIndex].units + 1};

      return {
        ...state,
        products: products,
      };
    } else {
      return {
        ...state,
        products: [
          ...state.products,
          action.product
        ],
      };
    }
  }),
  on(RemoveProductFromCar, (state, action) => {
    const products = [...state.products];
    const productIndex = state.products.findIndex((p: Product) => p.id === action.id);

    if(products[productIndex].quantity > 1) {
      products[productIndex] = {...products[productIndex], quantity: products[productIndex].quantity - 1};

      return {
        ...state,
        products: products,
      };
    } else {
      return {
        ...state, 
        products: state.products.filter((i) => i.id !== action.id)
      };
    }
  }),
  on(EmptyShoppingCar, (state) => ({
    ...state, 
    products: []
  })),
);

