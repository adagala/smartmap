import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { MapComponent } from './map.component';
import * as fromMaps from '../../reducers'
import { FormsModule } from '@angular/forms';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapComponent ],
      imports: [
        FormsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(fromMaps.mapFeatureKey, fromMaps.reducer)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
