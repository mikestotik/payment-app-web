import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { DIALOGS } from '../../config/dialogs.config';
import { ROUTE_CONFIG } from '../../config/routes.config';
import { IPaymentAccount } from '../../models/methods/methods.model';
import { DeletePaymentAccount, SavePaymentAccount, UpdatePaymentAccount } from '../../models/methods/store/payment-account.action';
import { selectPaymentAccountEntities } from '../../models/methods/store/payment-account.selector';
import { AppState } from '../../store';
import { DialogComponent } from '../shared/components/dialog/dialog.component';

const TITLE = {
    EDIT: 'Edit Account',
    CREATE: 'New Account'
};

const FORM_FIELD_NAMES = {
    ACCOUNT_NAME: 'accountName',
    ACCOUNT_NUMBER: 'accountNumber',
    BSB: 'bsb'
};

@Component({
    selector: 'app-method-account',
    templateUrl: './method-account.component.html',
    styleUrls: [ './method-account.component.scss' ]
})
export class MethodAccountComponent implements OnInit, OnDestroy {

    public title: string;
    public data: IPaymentAccount;
    public form: FormGroup;
    public formFieldNames = FORM_FIELD_NAMES;

    private unsubscribe$ = new Subject<void>();

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private store: Store<AppState>,
        private dialog: MatDialog) {
    }

    public ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');

        this.initTitle(id);
        this.initData(id);
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    public onBack(): void {
        this.router.navigate([ ROUTE_CONFIG.METHODS.getRootPath() ]);
    }

    public onDelete(): void {
        const dialog = this.dialog.open(DialogComponent);

        const dialogInstance = dialog.componentInstance;
        dialogInstance.message = DIALOGS.DELETE_CARD;
        dialogInstance.successButtonName = 'Delete';

        dialogInstance.success$.subscribe(() => {
            this.store.dispatch(new DeletePaymentAccount({ id: this.data.id }));
        });
    }

    public submitForm(): void {
        if (this.form.valid) {
            const data: IPaymentAccount = {
                ...this.data,
                ...this.form.value
            };

            if (!data.id) {
                this.store.dispatch(new SavePaymentAccount({ entity: data }));
            } else {
                this.store.dispatch(new UpdatePaymentAccount({ entity: data }));
            }
        }
    }

    private initTitle(id: string): void {
        this.title = id ? TITLE.EDIT : TITLE.CREATE;
    }

    private initData(id: string): void {
        if (id) {
            this.store.select(selectPaymentAccountEntities).pipe(
                map(dict => dict[Number(id)]),
                tap(entity => this.data = entity as IPaymentAccount),
                takeUntil(this.unsubscribe$)
            )
                .subscribe(entity => {
                    this.form = this.createForm(entity);
                });
        } else {
            this.form = this.createForm();
        }
    }

    private createForm(value?: IPaymentAccount): FormGroup {
        return this.fb.group({
            [this.formFieldNames.ACCOUNT_NAME]: [ value ? value.accountName : null, [ Validators.required ] ],
            [this.formFieldNames.ACCOUNT_NUMBER]: [ value ? value.accountNumber : null, [ Validators.required ] ],
            [this.formFieldNames.BSB]: [ value ? value.bsb : null, [ Validators.required ] ]
        });
    }
}
