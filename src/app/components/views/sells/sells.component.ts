import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Store } from '@ngrx/store';
import { State, selectSellsList, selectSellsState } from '../../../store/reducers';
import { Product, Sell, Transaction, TransactionDetail } from '../../../models/product.model';
import { EmptySells, GetSells, OpenSells, SetSells } from '../../../store/actions/sells.actions';
import { SellsState } from '../../../store/reducers/sells.reducer';
import { AddTransaction } from '../../../store/actions/transactions.actions';

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
  totalIncome = 0;
  totalOutcome = 0;
  earnings = 0;
  openStore = false;

  constructor(
    private store: Store<State>
  ) {
    store.select(selectSellsState).subscribe(sellsState => {
      this.sells = sellsState.sells;
      this.totalIncome = sellsState.totalIncome;
      this.totalOutcome = sellsState.totalOutcome;
      this.earnings = sellsState.earnings;
      this.openStore = sellsState.open;
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
  
        this.store.dispatch(AddTransaction({transaction: newTransaction}));
      }
      
      this.store.dispatch(EmptySells());
    } else {
      this.store.dispatch(EmptySells());
      this.store.dispatch(OpenSells());
    }
  }
}
