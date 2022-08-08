import { Component, OnInit } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    MaxValidator,
    Validators,
} from "@angular/forms";
import { map, Observable, startWith, tap } from "rxjs";

@Component({
    selector: "app-complex-form",
    templateUrl: "./complex-form.component.html",
    styleUrls: ["./complex-form.component.scss"],
})
export class ComplexFormComponent implements OnInit {
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

    // phone and email observable
    showEmailCtrl$!: Observable<boolean>;
    showPhoneCtrl$!: Observable<boolean>;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.initFormControls();
        this.initMainForm();
        this.initFormsObservables();
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
        this.emailForm = this.formBuilder.group({
            email: this.emailCtrl,
            confirmEmail: this.confirmEmailCtrl,
        });
        // phone
        this.phoneCtrl = this.formBuilder.control("");
        // login info
        this.passwordCtrl = this.formBuilder.control("", Validators.required);
        this.confirmPasswordCtrl = this.formBuilder.control(
            "",
            Validators.required
        );
        this.loginInfoForm = this.formBuilder.group({
            username: ["", Validators.required],
            password: this.passwordCtrl,
            confirmPassword: this.confirmPasswordCtrl,
        });
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
            ]);
        } else {
            this.phoneCtrl.clearValidators();
        }
        // look again what is on the input once validators are changed
        this.phoneCtrl.updateValueAndValidity();
    }

    // action to do when form is submitted
    onSubmitForm(): void {
        console.log(this.mainForm.value);
    }
}
