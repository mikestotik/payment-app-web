import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ERROR_MESSAGE } from '../../config/messages.config';
import { Authenticate } from '../../core/auth/store/auth.action';
import { AppState } from '../../store';

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
    private store: Store<AppState>,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
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
      this.store.dispatch(new Authenticate({ credentials: this.form.value }));
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      [this.formFieldNames.username]: [ null, [ Validators.required, Validators.email ] ],
      [this.formFieldNames.password]: [ null, [ Validators.required ] ]
    });
  }
}
