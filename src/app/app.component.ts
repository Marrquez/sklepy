import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from './store/reducers';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { AddUser } from './store/actions/user.actions';
import { ADMIN_USER } from './app.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sklepy';
  auth = inject(Auth);

  constructor(
    private store: Store<State>,
    @Inject(ADMIN_USER) private adminID: string
  ) {
    onAuthStateChanged(this.auth, (data:any) => {
      if(data) {
        this.store.dispatch(AddUser({user: {name: data.email, uid: data.uid, isAdmin: data.uid === this.adminID}}));
      }
    });
  }
}
