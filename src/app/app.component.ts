

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { map } from 'rxjs/operators';
import { WeatherService } from 'src/service/weather.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'weather-app';



  weatherConditions: any[]=[];
  selectedCondition: any;
  forecastData: any[] = [];
  filteredData: any[] =[];

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.getWeatherConditions().subscribe({
      next: (data) => {
        console.log("data===>", data)
        console.log("selectedCondition ==>",this.selectedCondition);
        
        if (data && data.wethercondition && Array.isArray(data.wethercondition)) {
          this.weatherConditions = data.wethercondition.map((condition: { condition: any; }) => condition.condition);
        } else {
          console.log('Invalid weather data:', data);
        }
        console.log("weatherConditions ==>",this.weatherConditions);
      },
      error: (error) => {
        console.log('Error fetching weather conditions:', error);
      }
      
    });

    this.weatherService.getWeatherData().subscribe((forecast) => {
      this.forecastData = forecast.data;
      this.filteredData = this.forecastData;
    });
  }

  

  filterData() {
    if (this.selectedCondition && this.selectedCondition !== 'All') {
      this.filteredData = this.forecastData.filter(item => item.condition === this.selectedCondition);
    } else {
      this.filteredData = this.forecastData;
    }
  }

  
}
