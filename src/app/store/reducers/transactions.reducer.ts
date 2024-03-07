import { createReducer, on } from '@ngrx/store';
import { AddTransaction, SetTransactions, TransactionsActions } from '../actions/transactions.actions';
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
  on(AddTransaction, (state, action) => {
    const transactions = [...state.transactions];
    const transactionIndex = state.transactions.findIndex((p: Transaction) => p.date === action.transaction.date);
    let newState;

    if(transactionIndex !== -1) {
      transactions[transactionIndex] = {
        ...transactions[transactionIndex], 
        details: [
          ...transactions[transactionIndex].details, 
          ...action.transaction.details
        ]
      };

      newState = {
        ...state,
        transactions: transactions,
      };

      
    } else {
      newState =  {
        ...state,
        transactions: [
          ...state.transactions,
          action.transaction
        ],
      };
    }

    localStorage.setItem('sklepyTransactions', JSON.stringify(newState));
    return newState;
  }),
  on(SetTransactions, (state, action) => {
    return {
      ...state,
      transactions: action.savedState.transactions
    };
  }),
);

