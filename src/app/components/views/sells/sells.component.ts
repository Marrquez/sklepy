import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Store } from '@ngrx/store';
import { State, selectSellsList, selectSellsState } from '../../../store/reducers';
import { Product, Sell } from '../../../models/product.model';

@Component({
  selector: 'app-sells',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './sells.component.html',
  styleUrl: './sells.component.scss'
})
export class SellsComponent {
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

  finishSells(): void {

  }
}
