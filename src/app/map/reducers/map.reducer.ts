import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as MapActions from '../actions';
import { IRecord } from '../models';


export const mapFeatureKey = 'map';
export interface State extends EntityState<IRecord> {
  loaded: boolean;
  loading: boolean;
  selectedId: string | null;
  pets: boolean | null;
  section8: boolean | null;
  error: string | null;
  ids: number[],
  entities: {},
}

export const initialState: State = {
  loaded: false,
  loading: false,
  selectedId: null,
  pets: null,
  section8: null,
  error: null,
  ids: [],
  entities: {},
};

export const mapAdapter: EntityAdapter<IRecord> = createEntityAdapter<IRecord>({
  selectId: (record: IRecord) => record.propertyID
});

export const reducer = createReducer(
  initialState,
  on(MapActions.loadListings, (state): State => ({ ...state, loading: true })),
  on(MapActions.addListings, (state, { records }) => mapAdapter.addMany(records, ({ ...state, loading: false, loaded: true }))),
  on(MapActions.loadListingsFailure, (state, { error }): State => ({ ...state, loading: false, error })),
  on(MapActions.selectListing, (state, { selectedId }): State => ({ ...state, selectedId })),
  on(MapActions.filterListings, (state, { pets, section8 }): State => ({ ...state, pets, section8 })),
);
