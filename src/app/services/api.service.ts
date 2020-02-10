import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Station } from '../models/station.interface';
import { Result } from '../models/response.interfase';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  async getStations() {
    try {
      const response = await this.http.get<any>(`${environment.apiURL}/data`).toPromise();
      const stations: Station[] = response.stationBeanList.map(obj => {
        return {
          ...obj
        } as Station;
      });
      return {
        status: true,
        message: 'Stations loaded successfully',
        data: stations
      } as Result;
    } catch (error) {
      let errorMessage;
      if (typeof(error) === 'string') {
        errorMessage = error;
      } else {
        errorMessage = 'Something bad happened';
        console.log('Error fetchins stations', error);
      }
      return {
        status: false,
        message: errorMessage,
      } as Result;
    }
  }
}
