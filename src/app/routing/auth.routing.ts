import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTE_CONFIG } from '../config/routes.config';
import { AuthSignInComponent } from '../views/auth/auth-sign-in.component';

@NgModule({
  imports: [ RouterModule.forChild([
    {
      path: '',
      redirectTo: ROUTE_CONFIG.AUTH.SEGMENTS.SIGN_IN,
      pathMatch: 'full'
    },
    {
      path: ROUTE_CONFIG.AUTH.SEGMENTS.SIGN_IN,
      component: AuthSignInComponent
    }
  ]) ],
  exports: [ RouterModule ]
})
export class AuthRoutingModule {}
