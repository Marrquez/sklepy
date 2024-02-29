import { createReducer, on } from '@ngrx/store';
import { AddProduct, AddProducts, ProductActions, RemoveProduct, UpdateProduct } from '../actions/product.actions';
import { Product } from '../../models/product.model';
import { v4 as uuidv4 } from 'uuid';

export const productFeatureKey = 'product';

export interface ProductState {
  products: Array<Product>
}

export const initialState: ProductState = {
  products: []
};

export const productReducer = createReducer(
  initialState,
  on(AddProduct, (state, action) => ({
    ...state,
    products: [
      ...state.products, 
      { id: uuidv4(), name: action.name, value: action.value, quantity: action.quantity, units: action.units, price: action.price, threshold: action.threshold, available: action.available }],
  })),
  on(AddProducts, (state, action) => ({
    ...state,
    products: action.products
  })),
  on(RemoveProduct, (state, action) => ({
    ...state, 
    products: state.products.filter((i) => i.id !== action.id)
  })),
  on(UpdateProduct, (state, action) => ({
    ...state, 
    products: state.products.map((product) => {
      if(product.id === action.product.id) {
        return action.product;
      }
      return product;
    })
  })),
);

