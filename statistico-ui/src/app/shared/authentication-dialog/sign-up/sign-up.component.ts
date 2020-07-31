import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersDataService } from '../../services/data/user.data.service';
import { SubscribedComponent } from '../../subscription-destroy/subscription-destroy.component';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '../../services/base/authentication.service';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent extends SubscribedComponent implements OnInit {
    public signUpForm: FormGroup;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly authService: AuthenticationService,
        private readonly usersDataService: UsersDataService,
        private readonly dialogRef: MatDialogRef<SignUpComponent>,
    ) {
        super();
    }

    public ngOnInit(): void {
        this.signUpForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        });
    }

    public handleRegister(): void {
        this.usersDataService.create(this.signUpForm.value, 'users/register')
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe((response) => {
                this.authService.setLocalStorage(response);
                this.dialogRef.close();
            });
    }

}
