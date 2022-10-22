import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import { FlightsComponent } from './components/flights/flights.component';

import { ROOT_REDUCER } from './state/app.state';
import { FlightEffects } from './state/effects/flight.effects';


@NgModule({
  declarations: [
    AppComponent,
    FlightsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(ROOT_REDUCER),
    EffectsModule.forRoot([FlightEffects]),
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
