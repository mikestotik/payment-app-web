import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactsDetailsComponent } from '../views/contacts/contacts-details.component';
import { ContactsComponent } from '../views/contacts/contacts.component';

@NgModule({
  imports: [ RouterModule.forChild([
    {
      path: '',
      component: ContactsComponent
    },
    {
      path: 'details',
      component: ContactsDetailsComponent
    },
    {
      path: 'details/:id',
      component: ContactsDetailsComponent
    }
  ]) ],
  exports: [ RouterModule ]
})
export class ContactsRoutingModule {}
