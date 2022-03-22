import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { MapComponent } from './map.component';
import * as fromMaps from '../../reducers'
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapComponent ],
      imports: [
        FormsModule,
        MatToolbarModule,
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

  it('should render title', () => {
    const fixture = TestBed.createComponent(MapComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-toolbar span')?.textContent).toContain('Smart Map');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
