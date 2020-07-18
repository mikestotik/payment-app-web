import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTE_CONFIG } from '../config/routes.config';
import { PaymentCreateComponent } from '../views/payment/payment-create.component';
import { PaymentSuccessComponent } from '../views/payment/payment-success.component';
import { PaymentComponent } from '../views/payment/payment.component';

@NgModule({
    imports: [ RouterModule.forChild([
        {
            path: '',
            component: PaymentComponent
        },
        {
            path: ROUTE_CONFIG.PAYMENT.SEGMENTS.CREATE,
            component: PaymentCreateComponent
        },
        {
            path: ROUTE_CONFIG.PAYMENT.SEGMENTS.SUCCESS,
            component: PaymentSuccessComponent
        }
    ]) ],
    exports: [ RouterModule ]
})
export class PaymentRoutingModule {}
