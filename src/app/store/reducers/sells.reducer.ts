import { createReducer, on } from '@ngrx/store';
import { AddSell, EmptySells, OpenSells, SellsActions, SetSells, SetSklepStatus } from '../actions/sells.actions';
import { Product, Sell } from '../../models/product.model';
import { stat } from 'fs';

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

    const newState = {
      ...state,
      sells,
      totalIncome: incomes,
      totalOutcome: outcomes,
      earnings: earnings,
    };

    return newState;
  }),
  on(SetSells, (state, action) => {
    let sells: Array<Sell> = [];

    let [incomes, outcomes, earnings] = [0, 0, 0];

    action.savedState.forEach((sell) => {
      sells = [
        ...sells,
        sell
      ];
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

    const newState = {
      ...state,
      sells,
      totalIncome: incomes,
      totalOutcome: outcomes,
      earnings: earnings,
    };

    return newState;
  }),
  on(EmptySells, (state) => {
    return {
      ...state,
      date: '', 
      sells: [],
      totalIncome: 0,
      totalOutcome: 0,
      earnings: 0,
      open: false
    };
  }),
  on(SetSklepStatus, (state, action) => {
    return {
      ...state,
      open: action.sklepStatus.status,
      date: action.sklepStatus.date
    }; 
  }),
);

