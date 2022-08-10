import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function confirmEqualValidator(
    main: string,
    confirm: string
): ValidatorFn {
    return (ctrl: AbstractControl): null | ValidationErrors => {
        // first we check that both formCtrl exist in the formGroup
        if (!ctrl.get(main) || !ctrl.get(confirm)) {
            return { confirmEqual: "Invalid control names" };
        }

        // now the values van be retrieved
        const mainValue = ctrl.get(main)!.value;
        const confirmValue = ctrl.get(confirm)!.value;

        // returning null or ValidationErrors
        return mainValue === confirmValue
            ? null
            : { confirmEqual: { main: mainValue, confirm: confirmValue } };
    };
}
