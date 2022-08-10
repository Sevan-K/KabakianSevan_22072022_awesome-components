import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function phoneNumberValidator(): ValidatorFn {
    return (ctrl: AbstractControl): null | ValidationErrors => {
        let isPhoneNumber = ctrl.value
            .split("")
            .reduce(
                (isOnlyNumber: boolean, value: string) =>
                    isNaN(parseInt(value, 10)) ? false : isOnlyNumber,
                true
            );
        if (isPhoneNumber) {
            return null;
        } else {
            return { phoneNumber: ctrl.value };
        }
    };
}
