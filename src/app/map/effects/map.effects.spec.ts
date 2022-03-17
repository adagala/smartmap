import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { MapEffects } from './map.effects';

describe('MapEffects', () => {
  let actions$: Observable<any>;
  let effects: MapEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MapEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(MapEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
