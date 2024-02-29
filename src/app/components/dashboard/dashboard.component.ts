import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, selectProductList } from '../../store/reducers';
import { AddProduct } from '../../store/actions/product.actions';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  products: Array<Product> = [];
  constructor(private store: Store<State>) {
    store.select(selectProductList).subscribe(products => this.products = products);
  }

  addProduct(): void {
    this.store.dispatch(AddProduct({
      name: 'pName', 
      value: 123, 
      quantity: 1, 
      units: 10, 
      price: 200,
      ideal: 20, 
      available: 10
    }));
  }
}
