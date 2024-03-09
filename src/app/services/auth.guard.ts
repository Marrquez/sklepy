import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State, selectUserState } from '../store/reducers';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<State>);
  const router = inject(Router);

  return true;

  // return store.select(selectUserState).pipe(
  //   map((user) => {
  //     if(!user.uid) {
  //       router.navigate(['/login']);
  //     }
  //     return !!user.uid;
  //   })
  // ).subscribe(abc => true);
};
