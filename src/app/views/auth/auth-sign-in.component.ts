import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ERROR_MESSAGE } from '../../config/messages.config';
import { ROUTE_CONFIG } from '../../config/routes.config';
import { Auth2Service } from '../../core/auth/auth2.service';

// todo: move to CONFIG
const AUTH_SIGN_IN_FORM_FIELD_NAMES = {
    username: 'username',
    password: 'password'
};

@Component({
    selector: 'app-auth-sign-in',
    templateUrl: './auth-sign-in.component.html',
    styleUrls: [ './auth-sign-in.component.scss' ]
})
export class AuthSignInComponent implements OnInit {

    public formFieldNames = AUTH_SIGN_IN_FORM_FIELD_NAMES;
    public form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: Auth2Service,
        private router: Router,
        private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            [this.formFieldNames.username]: [ null, [ Validators.required, Validators.email ] ],
            [this.formFieldNames.password]: [ null, [ Validators.required ] ]
        });
    }

    public getUsernameErrorMessage(): string {
        const control = this.form.get(this.formFieldNames.username);
        if (control.hasError('required')) {
            return ERROR_MESSAGE.REQUIRED;
        }

        return control.hasError('email') ? ERROR_MESSAGE.NOT_VALID_EMAIL : '';
    }

    public submitForm(): void {
        if (this.form.valid) {
            this.authService.logIn(this.form.value).subscribe(
                () => {
                    this.router.navigate([ ROUTE_CONFIG.APP.getRootPath() ]);
                }, res => {
                    let error = res.error.detail || res.statusText;

                    if (!res.error && !res.error.detail) {
                        error = ERROR_MESSAGE.UNKNOWN_ERROR;
                    }

                    this.snackBar.open(error, null, {
                        duration: 3000
                    });
                });
        }
    }
}
