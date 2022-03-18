import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecord } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  getListings(): Observable<IRecord[]> {
    return this.http.get<IRecord[]>('./assets/json/properties.json');
  }
}
