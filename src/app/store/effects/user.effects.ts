import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AddUser } from '../actions/user.actions';
import { of, switchMap } from 'rxjs';
import { GetProducts } from '../actions/product.actions';
import { GetSklepStatus } from '../actions/sells.actions';



@Injectable()
export class UserEffects {
  readonly loadProducts$ = createEffect(
    () => this.actions$.pipe(
      ofType(AddUser),
      switchMap((action) => {
        localStorage.setItem('userData', JSON.stringify(action.user));
        return of( GetProducts(), GetSklepStatus());
      }
      ),
    )
  );

  constructor(private actions$: Actions) {}
}
