import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product, Sell } from '../../models/product.model';

export const SellsActions = createActionGroup({
  source: 'Sells',
  events: {
    'Load Sellss': emptyProps(),
    'Load Sellss Success': props<{ data: unknown }>(),
    'Load Sellss Failure': props<{ error: unknown }>(),
  }
});

export const AddSell = createAction(
  '[Sells Component] Add Sell',
  props<{ sell: Sell }>()
);
