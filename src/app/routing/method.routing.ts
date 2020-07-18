import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MethodAccountComponent } from '../views/method/method-account.component';
import { MethodCardComponent } from '../views/method/method-card.component';
import { MethodComponent } from '../views/method/method.component';

@NgModule({
  imports: [ RouterModule.forChild([
    {
      path: '',
      component: MethodComponent
    },
    {
      path: 'card',
      component: MethodCardComponent
    },
    {
      path: 'card/:id',
      component: MethodCardComponent
    },
    {
      path: 'account',
      component: MethodAccountComponent
    },
    {
      path: 'account/:id',
      component: MethodAccountComponent
    }
  ]) ],
  exports: [ RouterModule ]
})
export class MethodRoutingModule {}
