import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-authentication-dialog',
    templateUrl: './authentication-dialog.component.html',
    styleUrls: ['./authentication-dialog.component.scss']
})

export class AuthenticationDialogComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private readonly router: Router,
    ) { }

    ngOnInit() {
    }

}
