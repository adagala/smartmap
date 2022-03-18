import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { MapService } from '../services';
import * as MapActions from '../actions'



@Injectable()
export class MapEffects {



  constructor(private actions$: Actions, private service: MapService) { }

  loadEmployees$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MapActions.loadListings),
      switchMap(() => this.service.getListings()),
      map(records => MapActions.addListings({ records })),
      catchError(error => of(MapActions.loadListingsFailure({ error: error.statusText }))));
  });
}
