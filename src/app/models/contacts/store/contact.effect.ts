import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ROUTE_CONFIG } from '../../../config/routes.config';
import { ContactsService } from '../contacts.service';
import {
    ContactActionTypes,
    ContactDeletedFailure,
    ContactDeletedSuccessful,
    ContactSavedFailure,
    ContactSavedSuccessful,
    ContactsLoadedFailure,
    ContactsLoadedSuccessful,
    ContactUpdatedFailure,
    ContactUpdatedSuccessful,
    DeleteContact,
    SaveContact,
    UpdateContact
} from './contact.action';

@Injectable()
export class ContactEffect {

    @Effect()
    loadContacts$: Observable<Action> = this.actions$.pipe(
        ofType(ContactActionTypes.LOAD),
        switchMap(() => this.contactsService
            .getAll()
            .pipe(
                map(contacts => new ContactsLoadedSuccessful({ entities: contacts })),
                catchError(error => of(new ContactsLoadedFailure({ error })))
            )
        )
    );

    @Effect()
    saveContact$: Observable<Action> = this.actions$.pipe(
        ofType(ContactActionTypes.SAVE),
        switchMap((action: SaveContact) => this.contactsService
            .save(action.payload.entity)
            .pipe(
                map(contact => new ContactSavedSuccessful({ entity: contact })),
                tap(() => this.router.navigateByUrl(ROUTE_CONFIG.CONTACTS.getRootPath())),
                catchError(error => of(new ContactSavedFailure({ error })))
            )
        )
    );

    @Effect()
    updateContact$: Observable<Action> = this.actions$.pipe(
        ofType(ContactActionTypes.UPDATE),
        switchMap((action: UpdateContact) => this.contactsService
            .update(action.payload.entity)
            .pipe(
                map(contact => new ContactUpdatedSuccessful({ entity: { id: contact.id, changes: contact } })),
                tap(() => this.router.navigateByUrl(ROUTE_CONFIG.CONTACTS.getRootPath())),
                catchError(error => of(new ContactUpdatedFailure({ error })))
            )
        )
    );

    @Effect()
    deleteContact$: Observable<Action> = this.actions$.pipe(
        ofType(ContactActionTypes.DELETE),
        switchMap((action: DeleteContact) => this.contactsService
            .delete(action.payload.id)
            .pipe(
                map(id => new ContactDeletedSuccessful({ id })),
                tap(() => this.router.navigateByUrl(ROUTE_CONFIG.CONTACTS.getRootPath())),
                catchError(error => of(new ContactDeletedFailure({ error })))
            )
        )
    );

    constructor(
        private http: HttpClient,
        private actions$: Actions,
        private router: Router,
        private contactsService: ContactsService) {
    }
}
