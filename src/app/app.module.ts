import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { FirebaseConfig } from '../environments/firebase.config';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BrowserAnimationFactory } from '@angular/platform-browser/animations/src/animation_builder';
import {MatButtonModule, MatListModule, MatSlideToggle, MatSlideToggleModule, MatIconModule, MatToolbarModule} from '@angular/material';
import {MatMenuModule, MatCardModule, MatGridListModule} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { AngularWeatherWidgetModule, WeatherApiName } from 'angular-weather-widget';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(FirebaseConfig.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatListModule,
    MatSlideToggleModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    HttpClientModule,
    MatGridListModule,
    AngularWeatherWidgetModule.forRoot({
      key: '74692a33a089fa888a0fb43275b2632b',
      name: WeatherApiName.OPEN_WEATHER_MAP,
      baseUrl: 'http://api.openweathermap.org/data/2.5/weather?id=1253952'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
