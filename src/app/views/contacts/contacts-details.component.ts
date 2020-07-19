import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DIALOGS } from '../../config/dialogs.config';
import { ERROR_MESSAGE } from '../../config/messages.config';
import { ROUTE_CONFIG } from '../../config/routes.config';
import { IContact } from '../../models/contacts/contacts.model';
import { DeleteContact, SaveContact, UpdateContact } from '../../models/contacts/store/contact.action';
import { selectContactById } from '../../models/contacts/store/contact.selector';
import { AppState } from '../../store';
import { DialogComponent } from '../shared/components/dialog/dialog.component';

const TITLE = {
  EDIT: 'Edit Contact',
  CREATE: 'New Contact'
};

const FORM_FIELD_NAMES = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  EMAIL: 'email'
};

@Component({
  selector: 'app-contacts-details',
  templateUrl: './contacts-details.component.html',
  styleUrls: [ './contacts-details.component.scss' ]
})
export class ContactsDetailsComponent implements OnInit, OnDestroy {

  public title: string;
  public data: IContact;
  public form: FormGroup;
  public formFieldNames = FORM_FIELD_NAMES;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private dialog: MatDialog) {
  }

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.initTitle(id);
    this.initData(id);
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public onBack(): void {
    this.router.navigate([ ROUTE_CONFIG.CONTACTS.getRootPath() ]);
  }

  public getEmailErrorMessage(): string {
    const control = this.form.get(this.formFieldNames.EMAIL);
    if (control.hasError('required')) {
      return ERROR_MESSAGE.REQUIRED;
    }

    return control.hasError('email') ? ERROR_MESSAGE.NOT_VALID_EMAIL : '';
  }

  public submitForm(): void {
    if (this.form.valid) {
      const data: IContact = {
        ...this.data,
        ...this.form.value
      };

      if (!data.id) {
        this.store.dispatch(new SaveContact({ entity: data }));
      } else {
        this.store.dispatch(new UpdateContact({ entity: data }));
      }
    }
  }

  public onDelete(): void {
    const dialog = this.dialog.open(DialogComponent);

    const dialogInstance = dialog.componentInstance;
    dialogInstance.message = DIALOGS.DELETE_CONTACT;
    dialogInstance.successButtonName = 'Delete';

    dialogInstance.success$.subscribe(() => {
      this.store.dispatch(new DeleteContact({ id: this.data.id }));
    });
  }

  private initTitle(id: string): void {
    this.title = id ? TITLE.EDIT : TITLE.CREATE;
  }

  private initData(id: string): void {
    if (id) {
      this.store.select(selectContactById, Number(id)).pipe(
        takeUntil(this.unsubscribe$)
      )
        .subscribe((contact: IContact) => {
          this.data = contact;
          this.form = this.createForm(contact);
        });
    } else {
      this.form = this.createForm();
    }
  }

  private createForm(value?: IContact): FormGroup {
    return this.fb.group({
      [this.formFieldNames.FIRST_NAME]: [ value ? value.firstName : null, [ Validators.required ] ],
      [this.formFieldNames.LAST_NAME]: [ value ? value.lastName : null, [ Validators.required ] ],
      [this.formFieldNames.EMAIL]: [ value ? value.email : null, [ Validators.required, Validators.email ] ]
    });
  }

}
