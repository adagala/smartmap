import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as mapboxgl from 'mapbox-gl';
import { map, mergeMap, Subscription } from 'rxjs';
import * as MapActions from '../../actions';
import { IGeocode } from '../../models';
import * as MapSelectors from '../../selectors';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  private accessToken = 'pk.eyJ1IjoiYWRhZ2FsYSIsImEiOiJjbDB2ZnRnb2EwMXdjM2ptdDhwa3NxODA1In0.iJDvbyay4kzgGsNAgb3hAw';
  private records: Subscription | undefined;

  constructor(private store: Store) {
    this.store.dispatch(MapActions.loadListings());
  }

  ngOnInit(): void {

    const mapboxglMap = new mapboxgl.Map({
      accessToken: this.accessToken,
      container: 'map', // container ID
      style: 'https://api.maptiler.com/maps/openstreetmap/style.json?key=SoL71Zyf7SmLrVYWC7fQ', // style URL
      center: [-95.601961, 29.718855],
      zoom: 12
    });

    this.records = this.store.select(MapSelectors.selectAll)
      .pipe(mergeMap(records => records), map(recode => recode.geocode))
      .subscribe(geoCode => {
        const longitude = +geoCode.Longitude;
        const latitude = +geoCode.Latitude;
        new mapboxgl.Marker({ color: 'pink' })
          .setLngLat([longitude, latitude])
          .addTo(mapboxglMap);
      });
  }

  ngOnDestroy(): void {
    this.records?.unsubscribe();
  }
}
