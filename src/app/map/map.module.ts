import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './components/map/map.component';
import { EffectsModule } from '@ngrx/effects';
import { MapEffects } from './effects';
import { StoreModule } from '@ngrx/store';
import * as fromMaps from './reducers'
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

const MATERIAL_MODULES = [
  MatToolbarModule,
  MatButtonModule,
  MatListModule
]

@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    CommonModule,
    MapRoutingModule,
    FormsModule,
    ...MATERIAL_MODULES,
    StoreModule.forFeature(fromMaps.mapFeatureKey, fromMaps.reducer),
    EffectsModule.forFeature([MapEffects])
  ]
})
export class MapModule { }
