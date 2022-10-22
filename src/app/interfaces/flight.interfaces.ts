import { Flight } from '../classes/flight';

export interface FlightState {
    loading: boolean;
    flight: ReadonlyArray<Flight>;
}