import { Component, OnInit } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import { map, Observable, startWith } from "rxjs";

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

    test$!: Observable<boolean>;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.initFormControls();
        this.initMainForm();
        this.initFormsObservables();
    }

    private initFormsObservables() {
        this.test$ = this.contactPreferenceCtrl.valueChanges.pipe(
            startWith(this.contactPreferenceCtrl.value),
            map((value) => (value === "email" ? true : false))
        );
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

    onSubmitForm(): void {
        console.log(this.mainForm.value);
    }
}
