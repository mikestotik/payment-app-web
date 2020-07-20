import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FROM_PAYMENT } from '../../config/constants.config';
import { ROUTE_CONFIG } from '../../config/routes.config';
import { IContact } from '../../models/contacts/contacts.model';
import { selectContactById } from '../../models/contacts/store/contact.selector';
import { IPaymentAccount, IPaymentCard, MethodType } from '../../models/methods/methods.model';
import { selectPaymentAccountById } from '../../models/methods/store/payment-account.selector';
import { selectPaymentCardById } from '../../models/methods/store/payment-card.selector';
import { IPayment } from '../../models/payment/payment.model';
import { SavePayment, SetActivePayment, UpdateActivePayment } from '../../models/payment/store/payment.action';
import { selectActivePayment } from '../../models/payment/store/payment.selector';
import { AppState } from '../../app.state';

const FORM_FIELD_NAMES = {
  AMOUNT: 'amount',
  CONTACT_ID: 'contactId',
  METHOD_ID: 'methodId',
  METHOD_TYPE: 'methodType'
};

@Component({
  selector: 'app-payment-create',
  templateUrl: './payment-create.component.html',
  styleUrls: [ './payment-create.component.scss' ]
})
export class PaymentCreateComponent implements OnInit, OnDestroy {

  public contactsLink = ROUTE_CONFIG.CONTACTS.getRootPath();
  public methodsLink = ROUTE_CONFIG.METHODS.getRootPath();
  public fromPayment = FROM_PAYMENT;
  public payment: IPayment;
  public form: FormGroup;
  public formFieldNames = FORM_FIELD_NAMES;

  public contact: IContact;
  public paymentCard: IPaymentCard;
  public paymentAccount: IPaymentAccount;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>) {
  }

  public ngOnInit(): void {
    this.store.dispatch(new SetActivePayment({
      entity: {
        contactId: null,
        methodId: null,
        methodType: null,
        amount: null
      }
    }));

    this.updateActivePayment();

    this.store.select(selectActivePayment)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(item => {
        if (item) {
          this.initForm(item);

          if (item.contactId) {
            this.initContact(item.contactId);
          }

          if (item.methodId && item.methodType) {
            this.initMethod(item.methodId, item.methodType);
          }
        }
      });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public onBack(): void {
    this.router.navigate([ ROUTE_CONFIG.PAYMENT.getRootPath() ]);
  }

  public submitForm(): void {
    if (this.form.valid) {
      this.store.dispatch(new SavePayment({ entity: this.form.value }));
    }
  }

  private initForm(value: IPayment): void {
    this.form = this.fb.group({
      [this.formFieldNames.CONTACT_ID]: [ value.contactId, [ Validators.required ] ],
      [this.formFieldNames.METHOD_ID]: [ value.methodId, [ Validators.required ] ],
      [this.formFieldNames.METHOD_TYPE]: [ value.methodType, [ Validators.required ] ],
      [this.formFieldNames.AMOUNT]: [ value.amount, [ Validators.required ] ]
    });
  }

  private initContact(id: number): void {
    this.store.select(selectContactById, id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(i => this.contact = i);
  }

  private initMethod(id: number, type: MethodType): void {
    if (type === MethodType.CARD) {
      this.store.select(selectPaymentCardById, id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(i => this.paymentCard = i);
    } else {
      this.store.select(selectPaymentAccountById, id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(i => this.paymentAccount = i);
    }
  }

  private updateActivePayment(): void {
    const contactId = this.route.snapshot.queryParamMap.get('contact');
    const methodId = this.route.snapshot.queryParamMap.get('method');
    const methodType = this.route.snapshot.queryParamMap.get('methodType');

    if (contactId) {
      this.store.dispatch(new UpdateActivePayment({
        entity: {
          contactId: Number(contactId)
        }
      }));
    }

    if (methodId && methodType) {
      this.store.dispatch(new UpdateActivePayment({
        entity: {
          methodId: Number(methodId),
          methodType: methodType as MethodType
        }
      }));
    }
  }

}
