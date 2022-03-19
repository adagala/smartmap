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
  private records!: Subscription;
  private boundsSubscription!: Subscription;
  private mapboxglMap!: mapboxgl.Map;
  private bounds!: mapboxgl.LngLatBoundsLike;
  public selectedLngLat: [number, number] | undefined;

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

    this.records = this.store.select(MapSelectors.selectGeocodes)
      .pipe(
        mergeMap(geocodes => geocodes),
        map(geocode => geocode))
      .subscribe(geocode => {
        const longitude = +geocode.Longitude;
        const latitude = +geocode.Latitude;

        const marker = new mapboxgl.Marker({
          color: 'pink'
        });
        const element = marker.getElement();
        element.style.cursor = 'pointer';

        marker
          .setLngLat([longitude, latitude])
          .addTo(this.mapboxglMap);

        element.addEventListener('click', () => {
          this.selectedLngLat = [longitude, latitude];
          this.flyTo([longitude, latitude]);
        });
      });


    this.boundsSubscription = this.store.select(MapSelectors.selectBounds)
      .subscribe(bounds => {
        this.bounds = bounds;
        this.mapboxglMap.fitBounds(bounds, {
          padding: 100
        });
      })
  }

  ngOnDestroy(): void {
    this.records?.unsubscribe();
    this.boundsSubscription?.unsubscribe();
  }

  zoomOut() {
    this.selectedLngLat = undefined;
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
  }
}
