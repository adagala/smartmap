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

export const selectSelectedEntity = createSelector(
    selectEntities,
    selectSelectedId,
    (entities, selectedId) => selectedId && entities[selectedId]
);

export const selectBounds = createSelector(selectAll, state => {
    const longitudes = state.map(records => +records.geocode.Longitude);
    const latitudes = state.map(records => +records.geocode.Latitude);

    const minLatitude = latitudes.length > 0 ? Math.min(...latitudes) : 0;
    const minLongitude = longitudes.length > 0 ? Math.min(...longitudes) : 0;
    const southWesternBound: mapboxgl.LngLatLike = [minLongitude, minLatitude];

    const maxLatitude = latitudes.length > 0 ? Math.max(...latitudes) : 0;
    const maxLongitude = longitudes.length > 0 ? Math.max(...longitudes) : 0;
    const northEasternBound: mapboxgl.LngLatLike = [maxLongitude, maxLatitude];

    const bounds: mapboxgl.LngLatBoundsLike = [southWesternBound, northEasternBound];
    return bounds;
});

export const selectGeocodes = createSelector(selectAll, state => {
    const geocodes = state.map(records => records.geocode);
    return geocodes;
});
