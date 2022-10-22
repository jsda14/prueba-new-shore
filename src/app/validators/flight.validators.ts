import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FligthValidators {

    constructor() { }

    equalsValiditador( originField: string, destinationField: string){

        return ( formGroup: AbstractControl): ValidationErrors | null => {
            const origin = formGroup.get(originField)?.value;
            const destination = formGroup.get(destinationField)?.value;

            if (origin === destination){
                formGroup.get(destinationField)?.setErrors({ equal: true})
                return {
                    equal: true
                }
            }

            formGroup.get(destinationField)?.setErrors(null);
            return null
        }
    }
}
