import { Component, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, selectOpenCloseState, selectProductList, selectShoppingCarList, selectUserState } from '../../../store/reducers';
import { AddProduct, BulkUpdateProduct, UpdateProduct } from '../../../store/actions/product.actions';
import { AddProductToCar, EmptyShoppingCar, RemoveProductFromCar } from '../../../store/actions/shopping-car.actions';
import { Product, User } from '../../../models/product.model';
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
import { OpenSells, SetSells } from '../../../store/actions/sells.actions';
import {MatMenuModule} from '@angular/material/menu';
import { SklepyService } from '../../../services/sklepy.service';
import { SellsService } from '../../../services/sells.service';
import {MatTabsModule} from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

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
    MatMenuModule,
    MatTabsModule,
    TranslateModule,
    MatSelectModule,
    FormsModule
  ],
  providers: [SklepyService, AuthService],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  products:any = [];
  allProducts:any = [];
  shoppingCarProducts: Array<Product> = [];
  carItems = 0;
  isOpenStore = false;
  user: User = {
    name: '',
    uid: '',
    isAdmin: false
  };
  selectedCategory = 'all';
  displayedColumns: string[] = ['index', 'code', 'name', 'value', 'price', 'win', 'available', 'status', 'actions'];
  @ViewChild(ShoppingCarComponent) shoppingCar: ShoppingCarComponent;

  constructor(
    private store: Store<State>,
    public dialog: Dialog,
    private authService: AuthService,
    private _liveAnnouncer: LiveAnnouncer,
    private sklepyService: SklepyService,
    private sellsService: SellsService
  ) {
    store.select(selectUserState).subscribe(userState => this.user = userState);

    store.select(selectProductList).subscribe(products => {
      if(products.length > 0) {
        this.allProducts = products;
        const sortedProducts = this.filterProductsList(products, this.selectedCategory);
        this.products = new MatTableDataSource(sortedProducts);
      }
    });

    store.select(selectShoppingCarList).subscribe(products => {
      this.shoppingCarProducts = products;
      this.carItems = this.shoppingCarProducts.reduce((sum, product) => {
        return sum + product.units;
      }, 0);
    });

    store.select(selectOpenCloseState).subscribe(isOpen => this.isOpenStore = isOpen);
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    // this.products.sort = this.sort;
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

  setCategory(): void {

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
        available: current?.available,
        category: current?.category
      },
    });

    dialogRef.closed.subscribe(product => {
      if(product && !product.id) {
        let newProduct = JSON.parse(JSON.stringify(product));
        this.sklepyService.addProduct(newProduct).then((productRef) => {
          newProduct = {
            ...product,
            id: productRef.id
          };
          this.store.dispatch(AddProduct(newProduct));
        });
      } else if (product) {
        this.sklepyService.updateProduct(product).then(() => {
          this.store.dispatch(UpdateProduct({product: product}));
        });
      }
    });
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
    this.sellsService.addSell(ownSell, this.shoppingCarProducts).then((productRef) => {
      this.store.dispatch(SetSells({savedState: [{own: ownSell, products: this.shoppingCarProducts}], onAdd: true}));

      const productstoUpdate = this.getProductsToUpdate();

      this.sklepyService.bulkUpdateProducts(productstoUpdate).then(() => {
        this.store.dispatch(BulkUpdateProduct({productsQuantities: productstoUpdate}));

        this.cancelTransaction();
      });
    });
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

  updateProductsList() {
    const sortedProducts = this.filterProductsList(this.allProducts, this.selectedCategory);
    this.products = new MatTableDataSource(sortedProducts);
  }

  openStore(): void {
    this.store.dispatch(OpenSells());
  }

  logout(): void {
    this.authService.logout();
  }

  get username(): string {
    let username = '...';

    if(this.user.name) {
      username = this.user.name.split('@')[0];
    }

    return username;
  }

  private filterProductsList(products: Array<Product>, category: string): Array<Product> {
    let prods: Array<Product> = [];
    
    if(category === 'all') {
      if(this.user.isAdmin) {
        prods = [...products];
      } else {
        prods = products.filter(product => product.category !== 'test');
      }
    } else {
      prods = products.filter(product => product.category === category);
    }

    return [...prods].sort((a,b) => a.name.localeCompare(b.name));
  }

  private getProductsToUpdate(): Map<string, number> {
    const productQuantities:Map<string, number> = new Map<string, number>();

    this.shoppingCarProducts.forEach((shoppingProduct) => {
      if(shoppingProduct.id) {
        const product = this.allProducts.find((p: Product) => p.id === shoppingProduct.id);
        productQuantities.set(product.id, product.available - shoppingProduct.units);
      }
    });

    return productQuantities;
  }
}
