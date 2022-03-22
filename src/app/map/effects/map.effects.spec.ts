import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { MapEffects } from './map.effects';
import { MapService } from '../services';
import * as fromMaps from '../actions';
import { IRecord } from '../models';

describe('MapEffects', () => {
  let actions$: Observable<any>;
  let effects: MapEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MapEffects,
        provideMockActions(() => actions$)
      ],
      imports: [
        HttpClientModule
      ]
    });

    effects = TestBed.inject(MapEffects);
  });

  it('loadListings$ dispatches addListings$ action', () => {
    const actions = new ActionsSubject();
    const effects = new MapEffects(actions, newMapService());

    const result: Action[] = [];
    effects.loadListings$.subscribe((action) => {
      result.push(action);
    });

    const action = fromMaps.loadListings();
    actions.next(action);

    const record = newRecord({
      propertyID: 400
    });
    const records: IRecord[] = [record];
    expect(result).toEqual([
      fromMaps.addListings({ records }),
    ]);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});

const newRecord = ({ propertyID = null, pets = false, section8 = false } = {}): IRecord => ({
  propertyID: propertyID,
  name: `Record-${propertyID}`,
  pets,
  section8
});

const newMapService = (): MapService => {
  return {
    getListings: () => {
      const record = newRecord({
        propertyID: 400
      });
      const records: IRecord[] = [record];
      return of(records);
    }
  };
}
