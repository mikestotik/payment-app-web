import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MethodRoutingModule } from '../../routing/method.routing';
import { ViewSharedModule } from '../shared/shared.module';
import { MethodAccountComponent } from './method-account.component';
import { MethodCardComponent } from './method-card.component';
import { MethodComponent } from './method.component';

@NgModule({
  declarations: [
    MethodComponent,
    MethodCardComponent,
    MethodAccountComponent
  ],
  imports: [
    CommonModule,
    MethodRoutingModule,
    ViewSharedModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class ViewMethodModule {}
