import { createAction, props } from "@ngrx/store";
import { Flight } from "src/app/classes/flight";

export const loadFlight = createAction(
    '[Flight List] Load flight'
);

export const loadedFlight = createAction(
    '[Flight List] Loaded sucess',
    props< { flight: Flight[]} > ()
)