import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ContactsService } from './contacts.service';
import { ContactEffect } from './store/contact.effect';
import { contactReducer, REDUCER_KEY_CONTACTS } from './store/contact.reducer';

@NgModule({
  imports: [
    EffectsModule.forFeature([ ContactEffect ]),
    StoreModule.forFeature(REDUCER_KEY_CONTACTS, contactReducer)
  ],
  providers: [
    ContactsService
  ]
})
export class ContactsModule {}
