import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../../models/product.model';

export const ProductActions = createActionGroup({
  source: 'Product',
  events: {
    'Load Products': emptyProps(),
    'Load Products Success': props<{ data: unknown }>(),
    'Load Products Failure': props<{ error: unknown }>(),
  }
});

export const AddProduct = createAction(
  '[Product Component] Add Product',
  props<{ id: string, name: string; value: number, quantity: number, units: number, price: number, available: number}>()
);
export const AddProducts = createAction(
  '[Product Component] Add Products',
  props<{ products: Array<Product> }>()
);
export const RemoveProduct = createAction(
  '[Product Component] Remove Product',
  props<{ id: string }>()
);
export const UpdateProduct = createAction(
  '[Product Component] Update Product',
  props<{ product: Product }>()
);
export const BulkUpdateProduct = createAction(
  '[Product Component] Bulk Update Product',
  props<{ productsQuantities: Map<string, number> }>()
);
