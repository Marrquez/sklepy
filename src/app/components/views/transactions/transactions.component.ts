import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, selectTransactionsList } from '../../../store/reducers';
import { Transaction } from '../../../models/product.model';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatExpansionModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit {
  transactions:Array<Transaction> = [];

  constructor(
    private store: Store<State>,
    public translate: TranslateService,
  ) {
    store.select(selectTransactionsList).subscribe(trasnactions => {
      this.transactions = this.getSortedTransactions(trasnactions);
    });
  }

  ngOnInit(): void {
  }

  private getSortedTransactions(transactions: Array<Transaction>): Array<Transaction> {
    return transactions;
  }
}
