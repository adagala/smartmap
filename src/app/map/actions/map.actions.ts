import { createAction, props } from '@ngrx/store';
import { IRecord } from '../models';

export const loadListings = createAction(
  '[Map] Load Listings'
);

export const addListings = createAction(
  '[Map] Add Listings',
  props<{ records: IRecord[] }>()
)

export const loadListingsFailure = createAction(
  '[Map] Load Listings Failure',
  props<{ error: string | null }>()
);
