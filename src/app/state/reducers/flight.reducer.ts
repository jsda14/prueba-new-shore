import { createReducer, on } from '@ngrx/store';
import { loadFlight, loadedFlight } from '../actions/flight.actions';
import { FlightState } from 'src/app/interfaces/flight.interfaces';

export const initialState: FlightState = { loading: false, flight: []}

export const flightReducer = createReducer(
  initialState,
  on(loadFlight, (state) => {
    return { ...state , loading: true}
  }),
  on(loadedFlight, (state, { flight }) => {
    return { ...state , loading: false, flight }
  })
);