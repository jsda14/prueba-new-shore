import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Flight } from '../../classes/flight';

@Injectable({
    providedIn: 'root'
})
export class FlightService {

    baseUrl: string = environment.baseURL;

    constructor(private http: HttpClient) { }

    getFlight() {
        return this.http.get<Flight>(this.baseUrl);
    }
}
