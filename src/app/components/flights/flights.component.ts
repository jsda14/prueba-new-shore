import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLoading } from 'src/app/state/selectors/flight.selector';
import { FligthValidators } from 'src/app/validators/flight.validators';
import { loadFlight } from '../../state/actions/flight.actions';
import { selectListFlights } from '../../state/selectors/flight.selector';
import { FlightService } from '../services/flight.service';

@Component({
    selector: 'app-flights',
    templateUrl: './flights.component.html',
    styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {


    flightForm: FormGroup = this.fb.group({
        destination: ['', [Validators.required, Validators.maxLength(3)] ],
        origin: ['', [Validators.required, Validators.maxLength(3)] ]
    },{
        validators: [this.fligthValidator.equalsValiditador('origin', 'destination')]
    })

    loading$: Observable<boolean> = new Observable();
    flights$: Observable<any> = new Observable();

    constructor(private store: Store<any>,
                private fb: FormBuilder,
                private fligthValidator: FligthValidators) { }

    ngOnInit(): void {
        this.loading$ = this.store.select(selectLoading);
        this.flights$ = this.store.select(selectListFlights);
        this.store.dispatch(loadFlight());
    }

    invalidField( campo: string ){
        return this.flightForm.get(campo)?.invalid &&
               this.flightForm.get(campo)?.touched;
    }



}
