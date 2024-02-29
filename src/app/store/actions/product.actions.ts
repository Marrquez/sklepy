import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';

export const ProductActions = createActionGroup({
  source: 'Product',
  events: {
    'Load Products': emptyProps(),
    'Load Products Success': props<{ data: unknown }>(),
    'Load Products Failure': props<{ error: unknown }>(),
  }
});

export const AddProduct = createAction(
  '[Todo Component] Add Product',
  props<{ name: string; value: number, quantity: number, units: number, price: number, ideal: number, available: number }>()
);
export const RemoveProduct = createAction(
  '[Todo Component] Remove Product',
  props<{ id: string }>()
);
