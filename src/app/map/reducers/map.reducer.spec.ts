import { IRecord } from '../models';
import { reducer, initialState, State } from './map.reducer';
import * as MapActions from '../actions';

describe('Map Reducer', () => {

  describe('add Listings', () => {
    it('MapActions.addListings adds an array of records', () => {
      const record = newRecord();
      const records = [record];
      const state = reducer(initialState, MapActions.addListings({ records }));

      expect(state).toEqual({
        entities: {
          [record.propertyID]: record,
        },
        error: null,
        ids: [record.propertyID],
        loaded: true,
        loading: false,
        pets: null,
        section8: null,
        selectedId: null
      });
    });
  });

  describe('filter Listings', () => {
    it('MapActions.filterListings filters the array of records depending on pets & section8 values', () => {
      const record100 = newRecord({ propertyID: 100 });
      const record200 = newRecord({ propertyID: 200, pets: true });
      const record300 = newRecord({ propertyID: 300 });

      const pets = true;
      const section8 = false;
      const initialRecordState = createRecordState();
      const state = reducer(initialRecordState, MapActions.filterListings({ pets, section8 }));

      expect(state).toEqual({
        entities: {
          [record100.propertyID]: record100,
          [record200.propertyID]: record200,
          [record300.propertyID]: record300,
        },
        error: null,
        ids: [
          record100.propertyID,
          record200.propertyID,
          record300.propertyID,
        ],
        loaded: true,
        loading: false,
        pets: true,
        section8: false,
        selectedId: null
      });
    });
  });

  describe('select Listing', () => {
    it('MapActions.selectListing selects a record from the array based on the record id', () => {
      const record100 = newRecord({ propertyID: 100 });
      const record200 = newRecord({ propertyID: 200, pets: true });
      const record300 = newRecord({ propertyID: 300 });

      const selectedId = `${record100.propertyID}`;
      const initialRecordState = createRecordState();
      const state = reducer(initialRecordState, MapActions.selectListing({ selectedId }));

      expect(state).toEqual({
        entities: {
          [record100.propertyID]: record100,
          [record200.propertyID]: record200,
          [record300.propertyID]: record300,
        },
        error: null,
        ids: [
          record100.propertyID,
          record200.propertyID,
          record300.propertyID,
        ],
        loaded: true,
        loading: false,
        pets: null,
        section8: null,
        selectedId: `${record100.propertyID}`
      });
    });
  });
});

const newRecord = ({ propertyID = null, pets = false, section8 = false } = {}): IRecord => ({
  propertyID: propertyID,
  name: `Record-${propertyID}`,
  pets,
  section8
});

const createRecordState = ({
  entities = {
    100: newRecord({ propertyID: 100 }),
    200: newRecord({ propertyID: 200, pets: true }),
    300: newRecord({ propertyID: 300 }),
  },
  ids = [100, 200, 300],
  error = null,
  loaded = true,
  loading = false,
  pets = null,
  section8 = null,
  selectedId = null
} = {}): State => ({
  error,
  loaded,
  loading,
  pets,
  section8,
  selectedId,
  entities,
  ids
});