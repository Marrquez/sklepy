import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GetTransactions, SetTransactions } from '../actions/transactions.actions';
import { from, map, switchMap } from 'rxjs';
import { TransactionService } from '../../services/transactions.service';



@Injectable()
export class TransactionsEffects {
  readonly loadTransactions$ = createEffect(
    () => this.actions$.pipe(
      ofType(GetTransactions),
      switchMap(() => 
        from(this.transactionsService.getTransactions()).pipe(
          map(transactions => {
            const formattedTransactions = {
              transactions: transactions.map((t: any) => ({
                date: t.date,
                details: t.details.map((d: any) => ({incomes: d.incomes, outcomes: d.outcomes, earnings: d.earnings, list: d.list}))
              }))
            };
            
            return SetTransactions({savedState: formattedTransactions});
          })
        )
      ),
    )
  );

  constructor(
    private actions$: Actions,
    private transactionsService: TransactionService
  ) {}
}
