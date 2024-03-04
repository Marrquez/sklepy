import { createReducer, on } from '@ngrx/store';
import { AddSell, SellsActions } from '../actions/sells.actions';
import { Sell } from '../../models/product.model';

export const sellsFeatureKey = 'sells';

export interface SellsState {
  date: string;
  sells: Array<Sell>;
  totalIncome: number;
  totalOutcome: number;
  earnings: number;
  open: boolean;
}

export const initialState: SellsState = {
  date: '', 
  sells: [],
  totalIncome: 0,
  totalOutcome: 0,
  earnings: 0,
  open: false
};

export const sellsReducer = createReducer(
  initialState,
  on(AddSell, (state, action) => {
    const sells =  [
      ...state.sells, 
      action.sell
    ];

    let [incomes, outcomes, earnings] = [0, 0, 0];

    sells.forEach((sell) => {
      sell.products.forEach((product) => {
        const [price, value] = [product.quantity * product.price, product.quantity * product.value];

        if(sell.own) {
          outcomes += value;
        }

        if(!sell.own) {
          incomes += price;
          earnings += (price - value);
        }
      });
    });

    return {
      ...state,
      sells,
      totalIncome: incomes,
      totalOutcome: outcomes,
      earnings: earnings,
    };
  }),
);

