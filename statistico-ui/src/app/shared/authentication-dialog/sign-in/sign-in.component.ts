import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersDataService } from '../../services/data/user.data.service';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../../services/base/authentication.service';
import { MatDialogRef } from '@angular/material';
import { of, throwError } from 'rxjs';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {
    public signInForm: FormGroup;
    public errorMessage: string;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly usersDataService: UsersDataService,
        private readonly authService: AuthenticationService,
        private readonly dialogRef: MatDialogRef<SignInComponent>,
    ) {}

    public ngOnInit(): void {
        this.signInForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    public handleLogin(): void {
        this.usersDataService.create(this.signInForm.value, 'users/login')
            .pipe(
                catchError((error) => {
                    this.errorMessage = error.error.message;
                    return throwError(error);
                }),
            )
            .subscribe((response) => {
                this.errorMessage = null;
                this.authService.setLocalStorage(response);
                this.dialogRef.close();
            });
    }

}
