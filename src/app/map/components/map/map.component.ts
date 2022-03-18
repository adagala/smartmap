import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class MapComponent implements OnInit, OnDestroy {
  private accessToken = 'pk.eyJ1IjoiYWRhZ2FsYSIsImEiOiJjbDB2ZnRnb2EwMXdjM2ptdDhwa3NxODA1In0.iJDvbyay4kzgGsNAgb3hAw';
  private records: Subscription | undefined;
  private boundsSubscription: Subscription | undefined;

  constructor(private store: Store) {
    this.store.dispatch(MapActions.loadListings());
  }

  ngOnInit(): void {
    const mapboxglMap = new mapboxgl.Map({
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
        new mapboxgl.Marker({ color: 'pink' })
          .setLngLat([longitude, latitude])
          .addTo(mapboxglMap);
      });


    this.boundsSubscription = this.store.select(MapSelectors.selectBounds)
      .subscribe(bounds => {
        mapboxglMap.fitBounds(bounds, {
          padding: 100
        });
      })
  }

  ngOnDestroy(): void {
    this.records?.unsubscribe();
    this.boundsSubscription?.unsubscribe();
  }
}
