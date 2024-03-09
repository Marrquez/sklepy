import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { State, selectUserState } from '../store/reducers';
import { AddUser } from '../store/actions/user.actions';

@Injectable()
export class AuthService {
  auth = inject(Auth);

  constructor(
    private router: Router,
    private store: Store<State>,
  ) {
    onAuthStateChanged(this.auth, (data:any) => {
      if(data) {
        this.store.dispatch(AddUser({user: {name: data.email, uid: data.uid}}));
      }
    });
  }

  loginWithEmail(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((data:any) => {
        this.store.dispatch(AddUser({user: {name: data.user.email, uid: data.user.uid}}));
      })
      .catch((error) => {
        console.log(error)
        throw error;
      });
  }

  logout(): void {
    signOut(this.auth);
    this.router.navigate(['/login'])
  }

  navigate(view:string){
    this.router.navigate([view]);
  }
}
