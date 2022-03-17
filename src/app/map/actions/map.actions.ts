import { createAction, props } from '@ngrx/store';

export const loadMaps = createAction(
  '[Map] Load Maps'
);

export const loadMapsSuccess = createAction(
  '[Map] Load Maps Success',
  props<{ data: any }>()
);

export const loadMapsFailure = createAction(
  '[Map] Load Maps Failure',
  props<{ error: any }>()
);
