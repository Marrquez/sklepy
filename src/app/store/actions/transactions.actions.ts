import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Transaction } from '../../models/product.model';
import { TransactionsState } from '../reducers/transactions.reducer';

export const TransactionsActions = createActionGroup({
  source: 'Transactions',
  events: {
    'Load Transactionss': emptyProps(),
    'Load Transactionss Success': props<{ data: unknown }>(),
    'Load Transactionss Failure': props<{ error: unknown }>(),
  }
});

export const AddTransaction = createAction(
  '[Transaction Component] Add Transaction',
  props<{ transaction: Transaction }>()
);

export const SetTransactions = createAction(
  '[Transaction Component] Set Transactions',
  props<{ savedState: TransactionsState }>() 
);