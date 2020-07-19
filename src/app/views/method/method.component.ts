import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FROM_PAYMENT } from '../../config/constants.config';
import { ROUTE_CONFIG } from '../../config/routes.config';
import { ActionType, IAction } from '../../core/entities/actions';
import { IPaymentAccount, IPaymentCard, MethodType } from '../../models/methods/methods.model';
import { selectAllPaymentAccounts } from '../../models/methods/store/payment-account.selector';
import { selectAllPaymentCards } from '../../models/methods/store/payment-card.selector';
import { AppState } from '../../store';

const ACTIONS: Array<IAction> = [
  {
    type: ActionType.ADD_CARD,
    icon: 'add',
    title: 'Add Card'
  },
  {
    type: ActionType.ADD_ACCOUNT,
    icon: 'add',
    title: 'Add Account'
  }
];

@Component({
  selector: 'app-method',
  templateUrl: './method.component.html',
  styleUrls: [ './method.component.scss' ]
})
export class MethodComponent implements OnInit {

  public actions: Array<IAction> = ACTIONS;
  public from: string;
  public paymentCards$: Observable<Array<IPaymentCard>>;
  public paymentAccount$: Observable<Array<IPaymentAccount>>;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.from = this.route.snapshot.queryParamMap.get('from');
    this.paymentCards$ = this.store.select(selectAllPaymentCards);
    this.paymentAccount$ = this.store.select(selectAllPaymentAccounts);
  }

  public onBack(): void {
    this.router.navigate([ '..' ]);
  }

  public onAction($event: IAction): void {
    switch ($event.type) {
      case ActionType.ADD_CARD:
        this.router.navigate([ ROUTE_CONFIG.METHODS.getCardPath() ]);
        break;
      case ActionType.ADD_ACCOUNT:
        this.router.navigate([ ROUTE_CONFIG.METHODS.getAccountPath() ]);
        break;
      default:
        break;
    }
  }

  public onCard(item: IPaymentCard): void {
    if (this.from === FROM_PAYMENT) {
      this.router.navigate(
        [ ROUTE_CONFIG.PAYMENT.getCreatePath() ],
        {
          queryParams: {
            method: item.id,
            methodType: MethodType.CARD
          }
        });
    } else {
      this.router.navigate([ ROUTE_CONFIG.METHODS.getCardPath(item.id) ]);
    }
  }

  public onAccount(item: IPaymentAccount): void {
    if (this.from === FROM_PAYMENT) {
      this.router.navigate(
        [ ROUTE_CONFIG.PAYMENT.getCreatePath() ],
        {
          queryParams: {
            method: item.id,
            methodType: MethodType.ACCOUNT
          }
        });
    } else {
      this.router.navigate([ ROUTE_CONFIG.METHODS.getAccountPath(item.id) ]);
    }
  }
}
