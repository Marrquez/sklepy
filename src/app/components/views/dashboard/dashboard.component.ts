import { Component, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, selectOpenCloseState, selectProductList, selectShoppingCarList } from '../../../store/reducers';
import { AddProduct, BulkUpdateProduct, UpdateProduct } from '../../../store/actions/product.actions';
import { AddProductToCar, EmptyShoppingCar, RemoveProductFromCar } from '../../../store/actions/shopping-car.actions';
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
import {MatInputModule} from '@angular/material/input';
import { ShoppingCarComponent } from './shopping-car/shopping-car.component';
import { AddSell, EmptySells, OpenSells } from '../../../store/actions/sells.actions';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatTableModule, 
    MatSortModule, 
    MatIconModule, 
    MatSidenavModule,
    MatInputModule,
    ShoppingCarComponent,
    MatMenuModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  products:any = [];
  shoppingCarProducts: Array<Product> = [];
  carItems = 0;
  saved = true;
  openStore = false;
  displayedColumns: string[] = ['index', 'code', 'name', 'value', 'price', 'win', 'available', 'status', 'actions'];
  @ViewChild(ShoppingCarComponent) shoppingCar: ShoppingCarComponent;

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
      this.carItems = this.shoppingCarProducts.reduce((sum, product) => {
        return sum + product.quantity;
      }, 0);
    });

    store.select(selectOpenCloseState).subscribe(isOpen => this.openStore = isOpen);
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
        available: current?.available
      },
    });

    dialogRef.closed.subscribe(product => {
      if(product && !product.id) {
        this.store.dispatch(AddProduct(product));
        this.saved = false;
        this.save();
      } else if (product) {
        this.store.dispatch(UpdateProduct({product: product}));
        this.saved = false;
        this.save();
      }
    });
  }

  save(): void {
    localStorage.setItem('sklepyProducts', JSON.stringify(this.products.data));
    this.saved = true;
  }

  addToCar(product: Product): void {
    const productToAdd = {
      ...product,
      value: product.value / (product.quantity * product.units),
      units: 1
    };
    this.store.dispatch(AddProductToCar({product: productToAdd}));
    
    this.shoppingCar.updateTotalAmount();
  }

  checkout(ownSell: boolean): void {
    this.store.dispatch(AddSell({sell: {own: ownSell, products: this.shoppingCarProducts}}));

    this.store.dispatch(BulkUpdateProduct({productsQuantities: this.getProductsToUpdate()}));

    this.cancelTransaction();
    // this.save();
  }

  removeItemFromCar(item: Product): void {
    this.store.dispatch(RemoveProductFromCar({id: item?.id || ''}));
    this.shoppingCar.updateTotalAmount();
  }

  cancelTransaction(): void {
    this.store.dispatch(EmptyShoppingCar());
    this.shoppingCar.updateTotalAmount();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.products.filter = filterValue.trim().toLowerCase();
  }

  openCloseStore(): void {
    this.store.dispatch(EmptySells());
    this.store.dispatch(OpenSells());
  }

  private getProductsToUpdate(): Map<string, number> {
    const productQuantities:Map<string, number> = new Map<string, number>();

    this.shoppingCarProducts.forEach((product) => {
      if(product.id) {
        productQuantities.set(product.id, product.quantity);
      }
    });

    return productQuantities;
  }
}
