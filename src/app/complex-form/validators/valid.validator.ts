import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// a validator is a function returning an other one
export function validValidator(): ValidatorFn {
    return (ctrl: AbstractControl): null | ValidationErrors =>
        ctrl.value.includes("valid") ? null : { validValidator: ctrl.value };
}

// course solution
/* {
           if (ctrl.value.includes("valid")) {
            return null;
        }
        // if condition is not respected return an object which key is called in hasError
        else {
            return {
                validValidator: ctrl.value,
            };
        }
        return ctrl.value.includes("valid")
            ? null
            : { validValidator: ctrl.value };
    } */
