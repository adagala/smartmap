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

export const selectListing = createAction(
  '[Map] Select Listing',
  props<{ selectedId: string }>()
);

export const filterListings = createAction(
  '[Map] Filter Listings',
  props<{ pets: boolean, section8: boolean }>()
);
