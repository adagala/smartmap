import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecord } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  /**
   * Gets all property records
<<<<<<< HEAD
   * @returns Observable<IRecord[]>
=======
   * @returns IRecord[]
>>>>>>> 3a0f1ef61a242fd1e905b3a112bca68885d730f9
   */
  getListings(): Observable<IRecord[]> {
    return this.http.get<IRecord[]>('./assets/json/properties.json');
  }
}
