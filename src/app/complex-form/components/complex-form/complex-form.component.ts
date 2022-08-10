import { Component, OnInit } from "@angular/core";
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    MaxValidator,
    Validators,
} from "@angular/forms";
import { map, Observable, startWith, tap } from "rxjs";
import { ComplexFormService } from "../../services/complex-form.service";
import { confirmEqualValidator } from "../../validators/confirmEqual.validator";
import { phoneNumberValidator } from "../../validators/phoneNumber.validator";
import { validValidator } from "../../validators/valid.validator";

@Component({
    selector: "app-complex-form",
    templateUrl: "./complex-form.component.html",
    styleUrls: ["./complex-form.component.scss"],
})
export class ComplexFormComponent implements OnInit {
    // prop to know the loading state
    loading = false;

    // forms definition
    mainForm!: FormGroup;
    personalInfoForm!: FormGroup;
    contactPreferenceCtrl!: FormControl;
    emailCtrl!: FormControl;
    confirmEmailCtrl!: FormControl;
    emailForm!: FormGroup; // this formGroup is composed of two formControl
    phoneCtrl!: FormControl;
    passwordCtrl!: FormControl;
    confirmPasswordCtrl!: FormControl;
    loginInfoForm!: FormGroup; // this formGroup contain two formControl

    // phone and email observables
    showEmailCtrl$!: Observable<boolean>;
    showPhoneCtrl$!: Observable<boolean>;

    // isConfirmEmailCorrect$!: Observable<boolean>;

    constructor(
        private formBuilder: FormBuilder,
        private complexFormService: ComplexFormService
    ) {}

    ngOnInit(): void {
        this.initFormControls();
        this.initMainForm();
        this.initFormsObservables();
        // this.initErrorObservable();
    }

    // method to initiate the main form
    private initMainForm(): void {
        this.mainForm = this.formBuilder.group({
            personalInfo: this.personalInfoForm,
            contactPreference: this.contactPreferenceCtrl,
            email: this.emailForm,
            phone: this.phoneCtrl,
            loginInfo: this.loginInfoForm,
        });
    }

    // method to initiate formgroups and formControls
    private initFormControls(): void {
        // personal info
        this.personalInfoForm = this.formBuilder.group({
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
        });
        // contact preference
        this.contactPreferenceCtrl = this.formBuilder.control("email");
        // email
        this.emailCtrl = this.formBuilder.control("");
        this.confirmEmailCtrl = this.formBuilder.control("");
        this.emailForm = this.formBuilder.group(
            {
                email: this.emailCtrl,
                confirmEmail: this.confirmEmailCtrl,
            },
            // other argument to add validators
            { validators: [confirmEqualValidator("email", "confirmEmail")] }
        );
        // phone
        this.phoneCtrl = this.formBuilder.control("");
        // login info
        this.passwordCtrl = this.formBuilder.control("", Validators.required);
        this.confirmPasswordCtrl = this.formBuilder.control(
            "",
            Validators.required
        );
        this.loginInfoForm = this.formBuilder.group(
            {
                username: ["", Validators.required],
                password: this.passwordCtrl,
                confirmPassword: this.confirmPasswordCtrl,
            },
            {
                validators: [
                    confirmEqualValidator("password", "confirmPassword"),
                ],
            }
        );
    }

    // private method to initiate observables
    private initFormsObservables() {
        // initiate email observable
        this.showEmailCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
            // l'observable est lancé une premoère fois avec la valeur du formulaire
            startWith(this.contactPreferenceCtrl.value),
            // change form value by its
            map((preference) => preference === "email"),
            tap((showEmailCtrl) => this.setEmailValidator(showEmailCtrl))
        );
        // initiate phone observable
        this.showPhoneCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
            startWith(this.contactPreferenceCtrl.value),
            map((preference) => preference === "phone"),
            tap((showPhoneCtrl) => this.setPhoneValidators(showPhoneCtrl))
        );
    }

    private setEmailValidator(showEmailCtrl: boolean) {
        if (showEmailCtrl) {
            this.emailCtrl.addValidators([
                Validators.required,
                Validators.email,
                // validValidator(),
            ]);
            this.confirmEmailCtrl.addValidators([
                Validators.required,
                Validators.email,
            ]);
        } else {
            this.emailCtrl.clearValidators();
            this.confirmEmailCtrl.clearValidators();
        }
        this.emailCtrl.updateValueAndValidity();
        this.confirmEmailCtrl.updateValueAndValidity();
    }

    private setPhoneValidators(showPhoneCtrl: boolean) {
        if (showPhoneCtrl) {
            // add validators if phone is selected
            this.phoneCtrl.addValidators([
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(10),
                phoneNumberValidator(),
            ]);
        } else {
            this.phoneCtrl.clearValidators();
        }
        // look again what is on the input once validators are changed
        this.phoneCtrl.updateValueAndValidity();
    }

    /*     // method to init error message observable
    initErrorObservable() {
        this.isConfirmEmailCorrect$ = this.confirmEmailCtrl.valueChanges.pipe(
            map((confirmEmail) => confirmEmail === this.emailCtrl.value),
            tap((value) => console.log(value))
        );
    } */

    // action to do when form is submitted
    onSubmitForm(): void {
        console.log(this.mainForm.value);
        this.loading = true;
        this.complexFormService
            .saveUserInfo(this.mainForm.value)
            .pipe(
                tap((saved) => {
                    this.loading = false;
                    if (saved) {
                        this.resetForm();
                    } else {
                        console.error("Echec de l'enregistrement des données.");
                    }
                })
            )
            .subscribe();
    }

    // method to reset main form values
    resetForm() {
        this.mainForm.reset(); // empty all form value
        // inject a value and valuechanges observable is going to emmit
        this.contactPreferenceCtrl.patchValue("email" /* ,{emitEvent:false} */);
    }
    // method to get form controls errors, it takes an abstract ctrl as an argument (formCtrl and formGroup)
    getFormCtrlErrorText(ctrl: AbstractControl): string {
        if (ctrl.hasError("required")) {
            return "Ce champs est requis";
        } else if (ctrl.hasError("email")) {
            return "Merci d'entrer une adress mail valide";
        } else if (ctrl.hasError("phoneNumber")) {
            return "Le numéro de téléphone ne doit contenir que des chiffres";
        } else if (ctrl.hasError("minlength")) {
            return "Ce numéro de téléphone ne contient pas assez de chiffre";
        } else if (ctrl.hasError("maxlength")) {
            return "Ce numéro de téléphone contient trop de chiffre";
        } /*  else if (ctrl.hasError("confirmEqual")) {
            return "Les deux champs ne sont pas identique";
        }  */ else {
            return "Ce champs contient une erreur";
        }
    }
}
