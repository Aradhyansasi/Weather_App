import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlConstants } from 'src/shared/url.constants';



@Injectable({
  providedIn: 'root'
})
export class WeatherService {

 

  constructor(private http: HttpClient,  private urlConstants: UrlConstants,) { }


  getWeatherData(): Observable<any> {
    const url = this.urlConstants.baseUrl + this.urlConstants.weather_data;
    return this.http.get<any>(url);
  }

  getWeatherConditions(): Observable<any> {
    const apiUrl = this.urlConstants.baseUrl + this.urlConstants.weather_conditon;
    return this.http.get<any>(apiUrl);
  }


}
