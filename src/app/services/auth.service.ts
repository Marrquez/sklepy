import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';

@Injectable()
export class AuthService {
  auth = inject(Auth);

  constructor(
    private router: Router
  ) {
    onAuthStateChanged(this.auth, user => { 
      console.log('currentUser: ', user);
    });
  }

  loginWithEmail(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((data) => {
        console.log(data);
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
