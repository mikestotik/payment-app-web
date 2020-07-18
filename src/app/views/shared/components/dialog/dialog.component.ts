import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: [ './dialog.component.scss' ]
})
export class DialogComponent implements OnInit {

    public success$ = new Subject();
    public message: string;
    public successButtonName: string;

    ngOnInit(): void { }

    public onSuccess(): void {
        this.success$.next();
    }
}
