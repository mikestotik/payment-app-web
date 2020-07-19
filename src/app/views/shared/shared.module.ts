import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ContactsItemComponent } from './components/contacts-item/contacts-item.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { PaymentAccountComponent } from './components/payment-account/payment-account.component';
import { PaymentCardComponent } from './components/payment-card/payment-card.component';
import { CardHidePipe } from './pipes/card-hide.pipe';
import { CardTypePipe } from './pipes/card-type.pipe';
import { DateFormatPipe } from './pipes/date-format.pipe';

@NgModule({
  declarations: [
    MainContainerComponent,
    DateFormatPipe,
    DialogComponent,
    PaymentCardComponent,
    PaymentAccountComponent,
    CardTypePipe,
    CardHidePipe,
    ContactsItemComponent
  ],
  exports: [
    MainContainerComponent,
    DateFormatPipe,
    DialogComponent,
    PaymentCardComponent,
    PaymentAccountComponent,
    ContactsItemComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule
  ]
})
export class ViewSharedModule {}
