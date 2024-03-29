import { CommonModule } from '@angular/common';
import { EventEmitter, Component, Output, NO_ERRORS_SCHEMA } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { Product } from '../../../../models/product.model';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { Store } from '@ngrx/store';
import { State, selectShoppingCarList } from '../../../../store/reducers';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-shopping-car',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule, 
    MatCheckboxModule, 
    MatButtonModule,
    TranslateModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './shopping-car.component.html',
  styleUrl: './shopping-car.component.scss'
})
export class ShoppingCarComponent {
  isValidSell = true;
  shoppingCarProducts: Array<Product> = [];
  @Output() toggle = new EventEmitter();
  @Output() removeItem = new EventEmitter<Product>();
  @Output() cancelTransaction = new EventEmitter();
  @Output() checkout = new EventEmitter<boolean>();

  totalAmount = 0;
  checked = false;

  constructor(
    public translate: TranslateService,
    private store: Store<State>
  ) {
    store.select(selectShoppingCarList).subscribe(products => {
      this.shoppingCarProducts = products;
      this.checkValidSell();
      this.updateTotalAmount();
    });
  }

  updateTotalAmount(): void {
    this.totalAmount = this.shoppingCarProducts.reduce((sum, product) => {
      return sum + (product.units * product.price);
    }, 0);
  }

  toggleDrawer():void {
    this.toggle.emit();
  }

  remove(product: Product):void {
    this.removeItem.emit(product);
  }

  cancel():void {
    this.cancelTransaction.emit();
  }

  checkoutProducts():void {
    this.checkout.emit(this.checked);
    this.checked = false;
  }

  toggleCheck(): void {
    this.checked = !this.checked;
  }

  private checkValidSell(): void {
    this.isValidSell = this.shoppingCarProducts.every((ele) => ele.units <= ele.available);
  }
}
