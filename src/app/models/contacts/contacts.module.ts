import { NgModule } from '@angular/core';
import { ContactsService } from './contacts.service';

@NgModule({
    providers: [
        ContactsService
    ]
})
export class ContactsModule {}
