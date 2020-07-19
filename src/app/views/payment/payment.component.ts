import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ROUTE_CONFIG } from '../../config/routes.config';
import { ActionType, IAction } from '../../core/entities/actions';
import { IPayment } from '../../models/payment/payment.model';
import { selectAllPayments } from '../../models/payment/store/payment.selector';
import { AppState } from '../../store';

const ACTIONS: Array<IAction> = [
  {
    type: ActionType.CREATE,
    icon: 'add'
  }
];

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: [ './payment.component.scss' ]
})
export class PaymentComponent implements OnInit {

  public actions: Array<IAction> = ACTIONS;
  public payments$: Observable<IPayment[]>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.payments$ = this.store.select(selectAllPayments);
  }

  public onAction($event: IAction): void {
    if ($event.type === ActionType.CREATE) {
      this.router.navigate([ ROUTE_CONFIG.PAYMENT.getCreatePath() ]);
    }
  }

  public onBack(): void {
    this.router.navigate([ '..' ]);
  }
}
