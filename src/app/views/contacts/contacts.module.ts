import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { ContactsModule } from '../../models/contacts/contacts.module';
import { ContactsRoutingModule } from '../../routing/contacts.routing';
import { ViewPaymentModule } from '../payment/payment.module';
import { ViewSharedModule } from '../shared/shared.module';
import { ContactsDetailsComponent } from './contacts-details.component';
import { ContactsComponent } from './contacts.component';

@NgModule({
  declarations: [
    ContactsComponent,
    ContactsDetailsComponent
  ],
    imports: [
        CommonModule,
        ContactsRoutingModule,
        ViewSharedModule,
        ViewPaymentModule,
        ContactsModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class ViewContactsModule {}
