import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { FlightService } from 'src/app/components/services/flight.service';

@Injectable()
export class FlightEffects {

  loadFlights$ = createEffect(() => this.actions$.pipe(
    ofType('[Flight List] Load flight'),
    mergeMap(() => this.flightService.getFlight() // Retorna la data
      .pipe(
        map(flight => ({ type: '[Flight List] Loaded sucess', flight })),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private flightService: FlightService
  ) {}
}