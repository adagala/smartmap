import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as mapboxgl from 'mapbox-gl';
import { map, mergeMap, Subscription } from 'rxjs';
import * as MapActions from '../../actions';
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
  private mapboxglMap: mapboxgl.Map;
  private bounds: mapboxgl.LngLatBoundsLike;
  public selectedLngLat: [number, number];
  public selectedMarkerId: string;
  private markerIds: string[] = [];

  constructor(private store: Store) {
    this.store.dispatch(MapActions.loadListings());
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

        const marker = new mapboxgl.Marker({ color: 'blue' });
        const element = marker.getElement();

        const id = `${propertyId}_${Math.abs(longitude)}_${Math.abs(latitude)}`;
        element.id = id;
        this.markerIds = Array.from(new Set([...this.markerIds, id]));
        element.style.cursor = 'pointer';

        marker
          .setLngLat([longitude, latitude])
          .addTo(this.mapboxglMap);

        element.addEventListener('click', () => {
          this.selectedMarkerId = id;
          this.setMarkerStyles(id, true);
          this.selectedLngLat = [longitude, latitude];
          this.flyTo([longitude, latitude]);
        });
      });


    this.boundsSubscription = this.store.select(MapSelectors.selectBounds)
      .subscribe(bounds => {
        this.bounds = bounds;
        this.fitBounds();
      })
  }

  ngOnDestroy(): void {
    this.records?.unsubscribe();
    this.boundsSubscription?.unsubscribe();
  }

  zoomOut() {
    this.setMarkerStyles(this.selectedMarkerId);
    this.toggleMarkerDisplay(true);
    this.selectedLngLat = undefined;
    this.selectedMarkerId = undefined;
    this.fitBounds();
  }

  fitBounds() {
    this.mapboxglMap.fitBounds(this.bounds, {
      padding: 100
    });
  }

  flyTo(center: mapboxgl.LngLatLike) {
    this.mapboxglMap.flyTo({
      center,
      zoom: 18,
      bearing: 0,
      speed: 1.5,
      curve: 1,
      easing: (t) => t,
      essential: true
    });

    this.toggleMarkerDisplay();
  }

  private setMarkerStyles(id: string, isSelectingPin?: boolean) {
    const elementSelected = document.getElementById(id);
    const svg = elementSelected.querySelector('svg');
    svg.style.width = isSelectingPin ? '125%' : '100%';
    svg.style.height = isSelectingPin ? '125%' : '100%';
    const fillColor = isSelectingPin ? 'red' : 'blue';
    svg.querySelector('path').style.fill = fillColor;
  }

  private toggleMarkerDisplay(isZoomOut = false) {
    this.markerIds.forEach(markerId => {
      if (this.selectedMarkerId === markerId) return;

      const elementSelected = document.getElementById(markerId);
      elementSelected.style.display = isZoomOut ? 'block' : 'none';
    });
  }
}
