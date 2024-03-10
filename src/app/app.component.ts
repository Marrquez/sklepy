import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from './store/reducers';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { AddUser } from './store/actions/user.actions';

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
  private readonly adminUID = 'gBHfh65ImweUY3GGKJyN7qZrm3h2';

  constructor(
    private store: Store<State>,
  ) {
    onAuthStateChanged(this.auth, (data:any) => {
      if(data) {
        this.store.dispatch(AddUser({user: {name: data.email, uid: data.uid, isAdmin: data.uid === this.adminUID}}));
      }
    });
  }
}
