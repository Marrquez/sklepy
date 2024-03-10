import { createReducer, on } from '@ngrx/store';
import { SetTransactions } from '../actions/transactions.actions';
import { Transaction } from '../../models/product.model';

export const transactionsFeatureKey = 'transactions';

export interface TransactionsState {
  transactions: Array<Transaction>;
}

export const initialState: TransactionsState = {
  transactions: []
};

export const transactionsReducer = createReducer(
  initialState,
  on(SetTransactions, (state, action) => {
    return {
      ...state,
      transactions: action.savedState.transactions
    };
  }),
);

