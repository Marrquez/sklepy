import { Component, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, selectProductList, selectShoppingCarList } from '../../../store/reducers';
import { AddProduct, UpdateProduct } from '../../../store/actions/product.actions';
import { AddProductToCar } from '../../../store/actions/shopping-car.actions';
import { Product } from '../../../models/product.model';
import { CommonModule } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { NewProductComponent } from './new-product/new-product.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatTableModule, 
    MatSortModule, 
    MatCheckboxModule,
    MatIconModule, 
    MatSidenavModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  products:any = [];
  shoppingCarProducts: Array<Product> = [];
  carItems = 0;
  totalAmount = 0;
  ownSell = false;
  displayedColumns: string[] = ['index', 'code', 'name', 'value', 'price', 'win', 'threshold', 'actions'];

  constructor(
    private store: Store<State>,
    public dialog: Dialog,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    store.select(selectProductList).subscribe(products => {
      this.products = new MatTableDataSource(products);
    });

    store.select(selectShoppingCarList).subscribe(products => {
      this.shoppingCarProducts = products;
      this.carItems = this.shoppingCarProducts.length;
    });
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.products.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  adminProduct(current?: Product): void {
    const dialogRef = this.dialog.open<Product>(NewProductComponent, {
      data: {
        id: current?.id,
        name: current?.name,
        price: current?.price,
        value: current?.value,
        units: current?.units,
        quantity: current?.quantity,
        threshold: current?.threshold,
        available: current?.available
      },
    });

    dialogRef.closed.subscribe(product => {
      console.log('The dialog was closed');

      if(product && !product.id) {
        this.store.dispatch(AddProduct(product));
      } else if (product) {
        this.store.dispatch(UpdateProduct({product: product}));
      }
    });
  }

  save(): void {
    localStorage.setItem('sklepyProducts', JSON.stringify(this.products.data));
  }

  addToCar(product: Product): void {
    const productToAdd = {
      ...product,
      units: 1
    };
    this.store.dispatch(AddProductToCar({product: productToAdd}));
    this.updateTotalAmount();
  }

  checkout(): void {

  }

  private updateTotalAmount(): void {
    this.totalAmount = this.shoppingCarProducts.reduce((sum, product) => {
      return sum + (product.quantity * product.price);
    }, 0);
  }
}
