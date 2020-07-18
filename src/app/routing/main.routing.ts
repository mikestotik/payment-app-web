import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTE_CONFIG } from '../config/routes.config';
import { AuthGuard } from '../core/auth/auth.guard';
import { MainHomeComponent } from '../views/main/main-home.component';
import { MainComponent } from '../views/main/main.component';

@NgModule({
  imports: [ RouterModule.forChild([
    {
      path: '',
      component: MainComponent,
      children: [
        {
          path: '',
          redirectTo: ROUTE_CONFIG.APP.SEGMENTS.HOME,
          pathMatch: 'full'
        },
        {
          path: ROUTE_CONFIG.APP.SEGMENTS.HOME,
          component: MainHomeComponent
        },
        {
          path: ROUTE_CONFIG.PAYMENT.SEGMENTS.ROOT,
          loadChildren: () => import('../views/payment/payment.module')
              .then(m => m.ViewPaymentModule),
          canActivate: [ AuthGuard ]
        },
        {
          path: ROUTE_CONFIG.CONTACTS.SEGMENTS.ROOT,
          loadChildren: () => import('../views/contacts/contacts.module')
              .then(m => m.ViewContactsModule),
          canActivate: [ AuthGuard ]
        },
        {
          path: ROUTE_CONFIG.METHODS.SEGMENTS.ROOT,
          loadChildren: () => import('../views/method/method.module')
              .then(m => m.ViewMethodModule),
          canActivate: [ AuthGuard ]
        },
      ]
    }
  ]) ],
  exports: [ RouterModule ]
})
export class MainRoutingModule {}
