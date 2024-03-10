import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Store } from '@ngrx/store';
import { State, selectSellsState, selectTransactionsList } from '../../../store/reducers';
import { Sell, Transaction } from '../../../models/product.model';
import { EmptySells, GetSells, OpenSells } from '../../../store/actions/sells.actions';
import { SetTransactions } from '../../../store/actions/transactions.actions';
import { TransactionService } from '../../../services/transactions.service';

@Component({
  selector: 'app-sells',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './sells.component.html',
  styleUrl: './sells.component.scss'
})
export class SellsComponent implements OnInit {
  currentDate = new Date();
  sells: Array<Sell> = [];
  transactions:Array<Transaction> = [];
  totalIncome = 0;
  totalOutcome = 0;
  earnings = 0;
  openStore = false;

  constructor(
    private store: Store<State>,
    private transactionService: TransactionService
  ) {
    store.select(selectSellsState).subscribe(sellsState => {
      this.sells = sellsState.sells;
      this.totalIncome = sellsState.totalIncome;
      this.totalOutcome = sellsState.totalOutcome;
      this.earnings = sellsState.earnings;
      this.openStore = sellsState.open;
    });

    store.select(selectTransactionsList).subscribe(trasnactions => {
      this.transactions = trasnactions;
    });
  }

  ngOnInit(): void { 
    this.store.dispatch(GetSells());
  }

  openCloseSells(): void {
    if(this.openStore) {
      if((this.totalIncome + this.totalOutcome + this.earnings) !== 0) {
        const newTransaction: Transaction = {
          date: this.currentDate.toLocaleDateString(),
          details: [{
            incomes: this.totalIncome,
            outcomes: this.totalOutcome,
            earnings: this.earnings
          }]
        };

        this.transactionService.addTransaction(newTransaction).then(() => {
          const updatedTransactions = this.getUpdatedTransactions(newTransaction);
          this.store.dispatch(SetTransactions({savedState: {transactions: updatedTransactions}}));
        });
      }
      
      this.store.dispatch(EmptySells());
    } else {
      this.store.dispatch(EmptySells());
      this.store.dispatch(OpenSells());
    }
  }

  private getUpdatedTransactions(transaction: Transaction): Array<Transaction> {
    let transactions = [...this.transactions];
    const transactionIndex = transactions.findIndex((p: Transaction) => p.date === transaction.date);

    if(transactionIndex !== -1) {
      transactions[transactionIndex] = {
        ...transactions[transactionIndex], 
        details: [
          ...transactions[transactionIndex].details, 
          ...transaction.details
        ]
      };
    } else {
      transactions = [
        ...this.transactions,
        transaction
      ]; 
    }

    return transactions;
  }
}
