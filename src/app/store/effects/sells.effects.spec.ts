import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SellsEffects } from './sells.effects';

describe('SellsEffects', () => {
  let actions$: Observable<any>;
  let effects: SellsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SellsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(SellsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
