import { createReducer, on } from '@ngrx/store';
import { AddProduct, AddProducts, BulkUpdateProduct, ProductActions, RemoveProduct, UpdateProduct } from '../actions/product.actions';
import { Product } from '../../models/product.model';

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
      action
    ]
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
  on(BulkUpdateProduct, (state, action) => {
    const products = [...state.products];

    for(let product of action.productsQuantities) {
      const productIndex = state.products.findIndex((p: Product) => p.id === product[0]);
      products[productIndex] = {...products[productIndex], available: product[1]};
    }

    return {
      ...state,
      products: products,
    };
  }),
);

