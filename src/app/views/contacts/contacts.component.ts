import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ROUTE_CONFIG } from '../../config/routes.config';
import { ActionType, IAction } from '../../core/entities/actions';
import { IContact } from '../../models/contacts/contacts.model';
import { selectAllContacts } from '../../models/contacts/store/contact.selector';
import { AppState } from '../../app.state';

const ACTIONS: Array<IAction> = [
  {
    type: ActionType.CREATE,
    icon: 'add'
  }
];

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: [ './contacts.component.scss' ]
})
export class ContactsComponent implements OnInit {

  public actions: Array<IAction> = ACTIONS;
  public from: string;
  public contacts$: Observable<IContact[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.from = this.route.snapshot.queryParamMap.get('from');
    this.contacts$ = this.store.select(selectAllContacts);
  }

  public onAction($event: IAction): void {
    if ($event.type === ActionType.CREATE) {
      this.router.navigate([ ROUTE_CONFIG.CONTACTS.getDetailsPath() ]);
    }
  }

  public onBack(): void {
    switch (this.from) {
      case 'payment':
        // TODO: IF ACTIVE PAYMENT in LOCAL STORAGE!!!!!!!!!!
        this.router.navigate([ ROUTE_CONFIG.PAYMENT.getCreatePath() ]);
        break;
      default:
        this.router.navigate([ '..' ]);
        break;
    }
  }

  public onContact(contact: IContact): void {
    if (this.from === 'payment') {
      this.router.navigate([ ROUTE_CONFIG.PAYMENT.getCreatePath() ], {
        queryParams: {
          contact: contact.id
        }
      });
    } else {
      this.router.navigate([ ROUTE_CONFIG.CONTACTS.getDetailsPath(contact.id) ]);
    }
  }
}
