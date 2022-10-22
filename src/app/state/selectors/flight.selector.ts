import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { FlightState } from 'src/app/interfaces/flight.interfaces';

//Selector que tiene relación con  la propiedad items
export const selectFlightFeature = (state: AppState) => state.flight;

export const selectListFlights = createSelector(
    selectFlightFeature,
    (state: FlightState) => state.flight
);

export const selectLoading = createSelector(
    selectFlightFeature,
    (state: FlightState) => state.loading
);