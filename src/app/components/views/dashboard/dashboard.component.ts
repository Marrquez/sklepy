import { Component, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, selectProductList } from '../../../store/reducers';
import { AddProduct, UpdateProduct } from '../../../store/actions/product.actions';
import { Product } from '../../../models/product.model';
import { CommonModule } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { NewProductComponent } from './new-product/new-product.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTableModule, MatSortModule],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  products:any = [];
  displayedColumns: string[] = ['index', 'name', 'value', 'units', 'quantity', 'price', 'threshold', 'available', 'actions'];

  constructor(
    private store: Store<State>,
    public dialog: Dialog,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    store.select(selectProductList).subscribe(products => {
      this.products = new MatTableDataSource(products);
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
    // details about the values being sorted.
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
}
