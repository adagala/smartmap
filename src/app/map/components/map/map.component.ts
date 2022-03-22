import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as mapboxgl from 'mapbox-gl';
import { map, mergeMap, Subscription } from 'rxjs';
import * as MapActions from '../../actions';
import { IRecord } from '../../models';
import * as MapSelectors from '../../selectors';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnDestroy {
  private accessToken = 'pk.eyJ1IjoiYWRhZ2FsYSIsImEiOiJjbDB2ZnRnb2EwMXdjM2ptdDhwa3NxODA1In0.iJDvbyay4kzgGsNAgb3hAw';
  private records: Subscription;
  private boundsSubscription: Subscription;
  private selectedEntitySubscription: Subscription;
  private filterSubscription: Subscription;
  private mapboxglMap: mapboxgl.Map;
  private bounds: mapboxgl.LngLatBoundsLike;
  public selectedLngLat: [number, number];
  public selectedMarkerId: string;
  public filteredMarkersId: string[] = [];
  private markerIds: string[] = [];
  public selectedRecord: IRecord;
  private allRecords: IRecord[] = [];
  public filteredRecords: IRecord[] = [];
  public pets = false;
  public section8 = false;

  constructor(private store: Store) {
    this.store.dispatch(MapActions.loadListings());
    this.selectedEntitySubscription = this.store.select(MapSelectors.selectSelectedEntity)
      .subscribe(record => {
        if (record === null) return;

        const longitude = +record.geocode.Longitude;
        const latitude = +record.geocode.Latitude;
        const id = `${record.propertyID}`;

        this.selectedRecord = record;
        this.selectedMarkerId = id;
        this.setMarkerStyles(id, true);
        this.selectedLngLat = [longitude, latitude];
        this.zoomIn([longitude, latitude]);
      });
  }

  ngAfterViewInit(): void {
    this.mapboxglMap = new mapboxgl.Map({
      accessToken: this.accessToken,
      container: 'map', // container ID
      style: 'https://api.maptiler.com/maps/openstreetmap/style.json?key=SoL71Zyf7SmLrVYWC7fQ', // style URL
      zoom: 12
    });

    this.records = this.store.select(MapSelectors.selectAll)
      .pipe(
        mergeMap(records => records),
        map(record => record))
      .subscribe(record => {
        const longitude = +record.geocode.Longitude;
        const latitude = +record.geocode.Latitude;
        const propertyId = record.propertyID;
        this.allRecords = Array.from(new Set([...this.allRecords, record]));
        this.filteredRecords = Array.from(new Set([...this.filteredRecords, record]));

        const marker = new mapboxgl.Marker({ color: 'blue' });
        const element = marker.getElement();

        const id = `${propertyId}`;
        element.id = id;
        this.markerIds = Array.from(new Set([...this.markerIds, id]));
        this.filteredMarkersId = Array.from(new Set([...this.filteredMarkersId, id]));
        element.style.cursor = 'pointer';

        marker
          .setLngLat([longitude, latitude])
          .addTo(this.mapboxglMap);

        element.addEventListener('click', () => {
          this.selectListing(record.propertyID);
        });
      });


    this.boundsSubscription = this.store.select(MapSelectors.selectBounds)
      .subscribe(bounds => {
        this.bounds = bounds;
        this.fitBounds();
      });

    this.filterSubscription = this.store.select(MapSelectors.selectFilteredEntities)
      .subscribe(displayRecords => {
        this.filteredRecords = [];
        this.filteredMarkersId = [];

        displayRecords.forEach(record => {
          const elementSelected = document.getElementById(`${record.propertyID}`);

          elementSelected.style.display = 'block';
          this.filteredRecords = Array.from(new Set([...this.filteredRecords, record]));
          this.filteredMarkersId = Array.from(new Set([...this.filteredMarkersId, `${record.propertyID}`]));
        });

        var hideRecords = this.allRecords.filter(x => !displayRecords.includes(x));
        hideRecords.forEach(record => {
          const elementSelected = document.getElementById(`${record.propertyID}`);
          elementSelected.style.display = 'none';
        });
      });
  }

  ngOnDestroy(): void {
    this.records?.unsubscribe();
    this.boundsSubscription?.unsubscribe();
    this.selectedEntitySubscription?.unsubscribe();
    this.filterSubscription?.unsubscribe();
  }

  selectListing(id: number) {
    const selectedId = `${id}`;
    this.store.dispatch(MapActions.selectListing({ selectedId }));
  }

  zoomOut() {
    this.setMarkerStyles(this.selectedMarkerId);
    this.toggleMarkerDisplay(true);
    this.selectedLngLat = undefined;
    this.selectedMarkerId = undefined;
    this.selectedRecord = undefined;
    this.fitBounds();
  }

  /**
   * Zooms out the map to display all markers depending on bounds
   * determined by longitudes & latitudes available
   * @returns void
   */
  fitBounds(): void {
    this.mapboxglMap.fitBounds(this.bounds, {
      padding: 100
    });
  }

  zoomIn(center: mapboxgl.LngLatLike) {
    this.mapboxglMap.flyTo({
      center,
      zoom: 17,
      bearing: 0,
      speed: 2,
      curve: 1,
      easing: (t) => t,
      essential: true
    });

    this.toggleMarkerDisplay();
  }

  /**
   * Sets marker styles when selecting or unselecting a marker
   * @param id selected element id
   * @param isSelectingPin confirms if selecting pin or not
   * @returns void
   */
  private setMarkerStyles(id: string, isSelectingPin?: boolean): void {
    if (!id) return;

    const elementSelected = document.getElementById(id);
    const svg = elementSelected.querySelector('svg');
    svg.style.width = isSelectingPin ? '150%' : '100%';
    svg.style.height = isSelectingPin ? '150%' : '100%';
    const fillColor = isSelectingPin ? 'red' : 'blue';
    svg.querySelector('path').style.fill = fillColor;
  }

  /**
   * Displays all markers if it is zoom out or hides all
   * markers not selected if it is zoom in
   * @param isZoomOut zooming in or out
   * @returns void
   */
  private toggleMarkerDisplay(isZoomOut = false): void {
    const hasFilter = this.pets || this.section8;

    this.markerIds.forEach(markerId => {
      const elementSelected = document.getElementById(markerId);

      if (this.selectedMarkerId === markerId) return;

      if (!isZoomOut || (isZoomOut && !hasFilter)) {
        elementSelected.style.display = isZoomOut ? 'block' : 'none';
        return;
      }

      elementSelected.style.display = this.filteredMarkersId.includes(markerId) ? 'block' : 'none';
    });
  }

  filterRecords() {
    if (!this.pets && !this.section8) {
      this.zoomOut();
    }

    this.store.dispatch(MapActions.filterListings({ pets: this.pets, section8: this.section8 }));
  }
}
