import { createReducer, on } from '@ngrx/store';
import { EmptySells, SetSells, SetSklepStatus } from '../actions/sells.actions';
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
  on(SetSells, (state, action) => {
    let sells: Array<Sell> = [...action.savedState];
    let newSells: Array<Sell> = [];

    if(action.onAdd) {
      sells = [...sells, ...state.sells];
    }

    let [incomes, outcomes, earnings] = [0, 0, 0];

    sells.forEach((sell) => {
      newSells = [...newSells, sell];

      sell.products.forEach((product) => {
        const [price, value] = [product.units * product.price, product.units * product.value];

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
      sells: action.onAdd ? sells : newSells,
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

