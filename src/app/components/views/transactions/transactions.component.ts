import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, selectTransactionsList } from '../../../store/reducers';
import { Transaction } from '../../../models/product.model';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import { GetTransactions } from '../../../store/actions/transactions.actions';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatExpansionModule,
    MatIconModule,
    MatChipsModule,
    MatCheckboxModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit {
  transactions:Array<Transaction> = [];

  constructor(
    private store: Store<State>,
    public translate: TranslateService,
  ) {
    store.select(selectTransactionsList).subscribe(transactions => {
      this.transactions = transactions.map(t => {
        return {
          ...t,
          selected: false
        };
      });
    });
  }

  ngOnInit(): void {
    this.store.dispatch(GetTransactions());
  }

  updateBalance(transaction: Transaction): void {
    transaction.selected = !transaction.selected;
    console.log("Update transactions with... ", transaction);
  }

  checkOldPillsFormat(item: Transaction): boolean {
    return new Date(item.date) > new Date('2024-03-26T08:22:05.417Z');
  }
}
