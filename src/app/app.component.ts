import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GetProducts } from './store/actions/product.actions';
import { Store } from '@ngrx/store';
import { State } from './store/reducers';
import { GetSklepStatus } from './store/actions/sells.actions';
import { GetTransactions } from './store/actions/transactions.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sklepy';

  constructor(
    private store: Store<State>,
  ) {}

  ngOnInit() {
    this.store.dispatch(GetProducts());
    this.store.dispatch(GetSklepStatus());
    this.store.dispatch(GetTransactions());
  }
}
