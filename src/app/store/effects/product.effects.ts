import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SklepyService } from '../../services/sklepy.service';
import { from, map, switchMap } from 'rxjs';
import { AddProducts, GetProducts } from '../actions/product.actions';

@Injectable()
export class ProductEffects {
  readonly loadProducts$ = createEffect(
    () => this.actions$.pipe(
      ofType(GetProducts),
      switchMap(() => 
        from(this.sklepyService.getProducts()).pipe(
          map(products => {
            const formattedProducts = products.map((p:any) => ({
              id: p.id,
              name: p.name,
              price: p.price,
              value: p.value,
              units: p.units,
              quantity: p.quantity,
              available: p.available,
              category: p.category
            }));
            
            return AddProducts({products: formattedProducts});
          })
        )
      ),
    )
  );

  constructor(
    private actions$: Actions,
    private sklepyService: SklepyService
  ) {}
}
