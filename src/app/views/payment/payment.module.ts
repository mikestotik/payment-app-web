import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PaymentRoutingModule } from '../../routing/payment.routing';
import { ViewSharedModule } from '../shared/shared.module';
import { PaymentTransactionComponent } from './components/payment-transaction/payment-transaction.component';
import { PaymentCreateComponent } from './payment-create.component';
import { PaymentSuccessComponent } from './payment-success.component';
import { PaymentComponent } from './payment.component';

@NgModule({
  declarations: [
    PaymentComponent,
    PaymentSuccessComponent,
    PaymentCreateComponent,
    PaymentTransactionComponent
  ],
  exports: [
    PaymentTransactionComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    ViewSharedModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class ViewPaymentModule {}
