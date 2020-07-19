import { Component, Input, OnInit } from '@angular/core';
import { IContact } from '../../../../models/contacts/contacts.model';

@Component({
  selector: 'app-contacts-item',
  templateUrl: './contacts-item.component.html',
  styleUrls: [ './contacts-item.component.scss' ]
})
export class ContactsItemComponent implements OnInit {

  @Input()
  public data: IContact;

  constructor() { }

  ngOnInit(): void { }

}
