import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { DIALOGS } from '../../config/dialogs.config';
import { ROUTE_CONFIG } from '../../config/routes.config';
import { IPaymentCard } from '../../models/methods/methods.model';
import { DeletePaymentCard, SavePaymentCard, UpdatePaymentCard } from '../../models/methods/store/payment-card.action';
import { selectPaymentCardEntities } from '../../models/methods/store/payment-card.selector';
import { AppState } from '../../app.state';
import { DialogComponent } from '../shared/components/dialog/dialog.component';

const TITLE = {
  EDIT: 'Edit Card',
  CREATE: 'New Card'
};

const FORM_FIELD_NAMES = {
  FULL_NAME: 'fullName',
  CARD_NUMBER: 'cardNumber',
  EXPIRY_MONTH: 'expiryMonth',
  EXPIRY_YEAR: 'expiryYear'
};

@Component({
  selector: 'app-method-card',
  templateUrl: './method-card.component.html',
  styleUrls: [ './method-card.component.scss' ]
})
export class MethodCardComponent implements OnInit, OnDestroy {

  public title: string;
  public data: IPaymentCard;
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
    this.router.navigate([ ROUTE_CONFIG.METHODS.getRootPath() ]);
  }

  public onDelete(): void {
    const dialog = this.dialog.open(DialogComponent);

    const dialogInstance = dialog.componentInstance;
    dialogInstance.message = DIALOGS.DELETE_CARD;
    dialogInstance.successButtonName = 'Delete';

    dialogInstance.success$.subscribe(() => {
      this.store.dispatch(new DeletePaymentCard({ id: this.data.id }));
    });
  }

  public submitForm(): void {
    if (this.form.valid) {
      const data: IPaymentCard = {
        ...this.data,
        ...this.form.value
      };

      if (!data.id) {
        this.store.dispatch(new SavePaymentCard({ entity: data }));
      } else {
        this.store.dispatch(new UpdatePaymentCard({ entity: data }));
      }
    }
  }

  private initTitle(id: string): void {
    this.title = id ? TITLE.EDIT : TITLE.CREATE;
  }

  private initData(id: string): void {
    if (id) {
      this.store.select(selectPaymentCardEntities).pipe(
        map(dict => dict[Number(id)]),
        tap(entity => this.data = entity as IPaymentCard),
        takeUntil(this.unsubscribe$)
      )
        .subscribe(entity => {
          this.form = this.createForm(entity);
        });
    } else {
      this.form = this.createForm();
    }
  }

  private createForm(value?: IPaymentCard): FormGroup {
    return this.fb.group({
      [this.formFieldNames.FULL_NAME]: [ value ? value.fullName : null, [ Validators.required ] ],
      [this.formFieldNames.CARD_NUMBER]: [ value ? value.cardNumber : null, [ Validators.required ] ],
      [this.formFieldNames.EXPIRY_MONTH]: [ value ? value.expiryMonth : null, [ Validators.required ] ],
      [this.formFieldNames.EXPIRY_YEAR]: [ value ? value.expiryYear : null, [ Validators.required ] ]
    });
  }
}
