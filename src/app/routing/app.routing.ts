import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTE_CONFIG } from '../config/routes.config';
import { AuthGuard } from '../core/auth/auth.guard';

@NgModule({
  imports: [ RouterModule.forRoot([
    {
      path: '',
      redirectTo: ROUTE_CONFIG.APP.SEGMENTS.ROOT,
      pathMatch: 'full'
    },
    {
      path: ROUTE_CONFIG.APP.SEGMENTS.ROOT,
      loadChildren: () => import('../views/main/main.module')
        .then(m => m.ViewMainModule),
      canActivate: [ AuthGuard ]
    },
    {
      path: ROUTE_CONFIG.AUTH.SEGMENTS.ROOT,
      loadChildren: () => import('../views/auth/auth.module')
        .then(m => m.ViewAuthModule)
    }
  ]) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
