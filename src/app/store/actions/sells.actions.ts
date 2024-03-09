import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product, Sell } from '../../models/product.model';
import { SellsState } from '../reducers/sells.reducer';

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
export const EmptySells = createAction(
  '[Sells Component] Empty Sells'
);
export const SetSells = createAction(
  '[Sells Component] Set Sells',
  props<{ savedState: Array<Sell> }>() 
);
export const SetSklepStatus = createAction(
  '[Sells Component] Set SklepStatus',
  props<{ sklepStatus: {status: boolean, date: string} }>() 
);
export const OpenSells = createAction(
  '[Sells Component] Open Sells'
);
export const GetSells = createAction(
  '[Sells Component] Get Sells'
);
export const GetSklepStatus = createAction(
  '[Sells Component] Get SklepStatus Sells'
);
