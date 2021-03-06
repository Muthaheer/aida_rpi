import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Action } from 'rxjs/scheduler/Action';
import { HttpClient } from '@angular/common/http';
import { WeatherSettings, TemperatureScale, ForecastMode, WeatherLayout } from 'angular-weather-widget';
import { CurrentWeather } from 'angular-weather-widget/services/api/weather.api.service';

export interface Device {
  device_name: String;
  device_pin: Number;
  is_on: Boolean;
}

export interface DeviceId extends Device {
  id: String;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  private deviceCollection: AngularFirestoreCollection<Device>;
  devices: Observable<DeviceId[]>;
  user: Observable<firebase.User>;
  color = 'green';
  constructor(public afAuth: AngularFireAuth, db: AngularFirestore, private http: HttpClient) {
      this.afAuth.auth.signInAnonymously();
      this.user = this.afAuth.authState;
      this.deviceCollection = db.collection<Device>('home_devices');
      this.devices = this.deviceCollection.snapshotChanges().map(actions => {
          return actions.map(a => {
              const data = a.payload.doc.data() as Device;
              const id = a.payload.doc.id;
              return {id, ...data};
          });
      });
    }
    settings: WeatherSettings = {
      location: {
        cityName: 'Udupi'
      },
      backgroundColor: '#347c57',
      color: '#ffffff',
      width: 'auto',
      height: 'auto',
      showWind: true,
      scale: TemperatureScale.CELCIUS,
      forecastMode: ForecastMode.DETAILED,
      showDetails: true,
      showForecast: true,
      layout: WeatherLayout.NARROW,
      language: 'en'
    };

    deviceSwitch(device) {
        if (device.is_on === true) {
          this.deviceCollection.doc(device.id).update({is_on : false});
          } else {
          this.deviceCollection.doc(device.id).update({is_on : true});
        }
    }
}

