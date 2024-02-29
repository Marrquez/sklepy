import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { AddProducts } from './store/actions/product.actions';
import { Store } from '@ngrx/store';
import { State } from './store/reducers';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LeftSidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sklepy';

  constructor(private store: Store<State>) {}

  ngOnInit() {
    const products = localStorage.getItem('sklepyProducts');

    if(products) {
      this.store.dispatch(AddProducts({products: JSON.parse(products)}));
    }
  }
}
