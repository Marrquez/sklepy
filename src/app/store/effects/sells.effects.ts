import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SellsService } from '../../services/sells.service';
import { EmptySells, GetSells, GetSklepStatus, OpenSells, SetSells, SetSklepStatus } from '../actions/sells.actions';
import { forkJoin, from, map, switchMap } from 'rxjs';
import { Sell } from '../../models/product.model';



@Injectable()
export class SellsEffects {
  readonly loadSklepStatus$ = createEffect(
    () => this.actions$.pipe(
      ofType(GetSklepStatus),
      switchMap(() =>
        from(this.sellsService.getSklepStatus()).pipe(
          map((sklepStatus: any) => {
            const status = {
              status: sklepStatus[0].status,
              date: sklepStatus[0].date,
            };
            return SetSklepStatus({sklepStatus: status});
          })
        )
      )
    )
  );

  readonly loadSells$ = createEffect(
    () => this.actions$.pipe(
      ofType(GetSells),
      switchMap(() =>
        from(this.sellsService.getSells()).pipe(
          map((sells) => {
            const sellsArr: Array<Sell> = sells.map((s) => {
              return {own: s['own'], products: JSON.parse(s['products'])};
            });
            return SetSells({savedState: sellsArr, onAdd: false});
          })
        )
      )
    )
  );

  readonly openSells$ = createEffect(
    () => this.actions$.pipe(
      ofType(OpenSells),
      switchMap(() => {
        const currentDate = new Date().toISOString();
        return from(this.sellsService.updateSklepStatus(true, currentDate)).pipe(
          map(() => {
            const status = {
              status: true,
              date: currentDate
            };
            return SetSklepStatus({sklepStatus: status});
          })
        )
      })
    )
  );

  readonly closeSells$ = createEffect(
    () => this.actions$.pipe(
      ofType(EmptySells),
      switchMap(() => {
        return forkJoin( [from(this.sellsService.updateSklepStatus(false, '')), from(this.sellsService.deleteAll())]).pipe(
          map(() => {
            const status = {
              status: false,
              date: ''
            };
            return SetSklepStatus({sklepStatus: status});
          })
        )
      })
    )
  );

  constructor(
    private actions$: Actions,
    private sellsService: SellsService
  ) {}
}
