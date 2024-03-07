import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, selectTransactionsList } from '../../../store/reducers';
import { Transaction } from '../../../models/product.model';
import { SetTransactions } from '../../../store/actions/transactions.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit {
  transactions:Array<Transaction> = [];

  constructor(
    private store: Store<State>,
  ) {
    store.select(selectTransactionsList).subscribe(trasnactions => {
      this.transactions = trasnactions;
    });
  }

  ngOnInit(): void {
    if(this.transactions.length === 0) {
      const localTransactions = localStorage.getItem('sklepyTransactions');

      if(localTransactions) {
        this.store.dispatch(SetTransactions({savedState: JSON.parse(localTransactions)}));
      }
    }
  }
}
