import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMaps from '../reducers';

export const selectState = createFeatureSelector<fromMaps.State>(fromMaps.mapFeatureKey);

export const selectEntitiesState = createSelector(selectState, (state) => state);

export const selectLoading = createSelector(selectState, (state) => state.loading);

export const selectLoaded = createSelector(selectState, (state) => state.loaded);

export const selectSelectedId = createSelector(selectState, (state) => state.selectedId);

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = fromMaps.mapAdapter.getSelectors(selectEntitiesState);

export const selectSelectedEmployee = createSelector(
    selectEntities,
    selectSelectedId,
    (entities, selectedId) => selectedId && entities[selectedId]
);
