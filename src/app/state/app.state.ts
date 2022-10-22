import { ActionReducerMap } from "@ngrx/store";
import { flightReducer } from './reducers/flight.reducer';
import { FlightState } from 'src/app/interfaces/flight.interfaces';

export interface AppState {
    flight: FlightState
}

export const ROOT_REDUCER: ActionReducerMap<AppState> = {
    flight: flightReducer
}