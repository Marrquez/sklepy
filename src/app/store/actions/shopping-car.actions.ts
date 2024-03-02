import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../../models/product.model';

export const ShoppingCarActions = createActionGroup({
  source: 'ShoppingCar',
  events: {
    'Load ShoppingCars': emptyProps(),
    'Load ShoppingCars Success': props<{ data: unknown }>(),
    'Load ShoppingCars Failure': props<{ error: unknown }>(),
  }
});

export const AddProductToCar = createAction(
  '[Todo Component] Add Product To Car',
  props<{ product: Product }>()
);
export const RemoveProduct = createAction(
  '[Todo Component] Remove Product',
  props<{ id: string }>()
);
