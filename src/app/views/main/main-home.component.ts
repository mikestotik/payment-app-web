import { Component, OnInit } from '@angular/core';
import { ROUTE_CONFIG } from '../../config/routes.config';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: [ './main-home.component.scss' ]
})
export class MainHomeComponent implements OnInit {

  public paymentsUrl = ROUTE_CONFIG.PAYMENT.getRootPath();
  public contactsUrl = ROUTE_CONFIG.CONTACTS.getRootPath();
  public methodsUrl = ROUTE_CONFIG.METHODS.getRootPath();
  public authUrl = ROUTE_CONFIG.AUTH.getRootPath();

  public ngOnInit(): void { }

}
