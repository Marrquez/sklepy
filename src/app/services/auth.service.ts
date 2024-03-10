import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { State } from '../store/reducers';
import { AddUser } from '../store/actions/user.actions';

@Injectable()
export class AuthService {
  private readonly adminUID = 'gBHfh65ImweUY3GGKJyN7qZrm3h2';
  auth = inject(Auth);

  constructor(
    private router: Router,
    private store: Store<State>,
  ) { }

  loginWithEmail(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((data:any) => {
        localStorage.setItem('userData', JSON.stringify({name: data.email, uid: data.uid, isAdmin: data.uid === this.adminUID}));
        this.store.dispatch(AddUser({user: {name: data.user.email, uid: data.user.uid, isAdmin: data.uid === this.adminUID}}));
      })
      .catch((error) => {
        console.log(error)
        throw error;
      });
  }

  logout(): void {
    signOut(this.auth);
    localStorage.removeItem('userData');
    this.router.navigate(['/login'])
  }

  navigate(view:string){
    this.router.navigate([view]);
  }
}
