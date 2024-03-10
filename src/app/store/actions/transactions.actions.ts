import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { TransactionsState } from '../reducers/transactions.reducer';

export const TransactionsActions = createActionGroup({
  source: 'Transactions',
  events: {
    'Load Transactionss': emptyProps(),
    'Load Transactionss Success': props<{ data: unknown }>(),
    'Load Transactionss Failure': props<{ error: unknown }>(),
  }
});

export const SetTransactions = createAction(
  '[Transaction Component] Set Transactions',
  props<{ savedState: TransactionsState }>() 
);

export const GetTransactions = createAction(
  '[Transaction Component] Get Transactions'
);