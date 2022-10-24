import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FlightList } from 'src/app/interfaces/flight.interfaces';
import { selectLoading } from 'src/app/state/selectors/flight.selector';
import { FligthValidators } from 'src/app/validators/flight.validators';
import { loadFlight } from '../../state/actions/flight.actions';
import { selectListFlights } from '../../state/selectors/flight.selector';
import { Journey } from '../../classes/journey';
import Swal from 'sweetalert2';



@Component({
    selector: 'app-flights',
    templateUrl: './flights.component.html',
    styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {

    flightList: FlightList[] = [];
    journey!: Journey;
    departureStations: string[] = [];
    arrivalStations: string[] = [];

    totalPrice: number = 0;
    firstPrice: number = 0;
    secondPrice: number = 0;

    flightForm: FormGroup = this.fb.group({
        origin: ['', [Validators.required, Validators.minLength(3)]],
        destination: ['', [Validators.required, Validators.minLength(3)]]
    }, {
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
        this.flights$.subscribe(resp => {
            this.flightList = resp;

        })
    }

    invalidField(campo: string) {
        return this.flightForm.get(campo)?.invalid &&
            this.flightForm.get(campo)?.touched;
    }

    calculateRoute() {
        let origin = (this.flightForm.get('origin')?.value).toUpperCase();
        let destination = (this.flightForm.get('destination')?.value).toUpperCase();
        let newOrigins: string[] = [];
        let possibleFlights: FlightList[] = [];

        for (let i in this.flightList) {
            this.arrivalStations.push(this.flightList[i].arrivalStation);
            this.departureStations.push(this.flightList[i].departureStation);
        }

        if (this.arrivalStations.includes(origin) && this.departureStations.includes(destination)) {
            for (let i in this.flightList) {
                if (this.flightList[i].departureStation === origin && this.flightList[i].arrivalStation === destination) {
                    this.totalPrice = this.flightList[i].price;
                    this.journey = {
                        origin,
                        destination,
                        price: this.flightList[i].price,
                        flight: [
                            {
                                origin: this.flightList[i].departureStation,
                                destination: this.flightList[i].arrivalStation,
                                prices: this.flightList[i].price,
                                transport: {
                                    flightCarrier: this.flightList[i].flightCarrier,
                                    flightNumber: this.flightList[i].flightNumber
                                }
                            }
                        ]
                    }
                    break;
                } else if (this.flightList[i].departureStation === origin) {
                    possibleFlights.push(this.flightList[i])
                    newOrigins.push(this.flightList[i].arrivalStation);
                    this.getAvailableRoutes(newOrigins, origin, destination, possibleFlights);
                    break;
                }
            }

        } else {
            Swal.fire({
                icon: 'error',
                title: 'No existe ruta para ese origen y/o destino',
              })

        }

    }

    getAvailableRoutes(origins: string[], origin: string, destination: string, possibleFlights: FlightList[]) {
        let finalRoute: FlightList[] = [];

        for (let i in origins) {
            for (let j in this.flightList) {
                if (this.flightList[j].departureStation === origins[i] && this.flightList[j].arrivalStation === destination) {
                    finalRoute.push(this.flightList[j])
                } else {

                }
            }
        }

        if (finalRoute.length !== 0) {
            for (let i in possibleFlights) {
                if (possibleFlights[i].arrivalStation === finalRoute[0].departureStation) {
                    this.totalPrice = possibleFlights[i].price + finalRoute[0].price;
                    this.firstPrice = possibleFlights[i].price;
                    this.secondPrice = finalRoute[0].price;
                    this.journey = {
                        origin,
                        destination,
                        price: possibleFlights[i].price + finalRoute[0].price,
                        flight: [
                            {
                                origin: possibleFlights[i].departureStation,
                                destination: possibleFlights[i].arrivalStation,
                                prices: possibleFlights[i].price,
                                transport: {
                                    flightCarrier: possibleFlights[i].flightCarrier,
                                    flightNumber: possibleFlights[i].flightNumber
                                }
                            },
                            {
                                origin: finalRoute[0].departureStation,
                                destination: finalRoute[0].arrivalStation,
                                prices: finalRoute[0].price,
                                transport: {
                                    flightCarrier: finalRoute[0].flightCarrier,
                                    flightNumber: finalRoute[0].flightNumber
                                }
                            }
                        ]
                    }
                }
            }
        } else {

            Swal.fire({
                icon: 'error',
                title: 'No es posible calcular esta ruta',

              })
        }


    }
    currencyType(event: any){
        let value = event.target.value;

        switch (value) {
            case '1':
                this.totalPrice =  this.journey.price
                this.firstPrice = this.journey.flight[0].prices
                this.secondPrice = this.journey.flight[1].prices
                break;
            case '2':
                this.totalPrice =  this.journey.price * 4900
                this.firstPrice = this.journey.flight[0].prices * 4900
                this.secondPrice= this.journey.flight[1].prices * 4900
                break;
            case '3':
                this.totalPrice =  this.journey.price * 1.02
                this.firstPrice = this.journey.flight[0].prices * 1.02
                this.secondPrice = this.journey.flight[1].prices * 1.02
                break;
            default:
                break;
        }
    }

}
