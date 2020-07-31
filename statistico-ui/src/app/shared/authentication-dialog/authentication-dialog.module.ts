import { NgModule } from '@angular/core';
import { AuthenticationDialogComponent } from './authentication-dialog.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { MatTabsModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        MatTabsModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatDialogModule,
        ReactiveFormsModule,
    ],
    declarations: [
        AuthenticationDialogComponent,
        SignUpComponent,
        SignInComponent,
    ],
    entryComponents: [
        AuthenticationDialogComponent,
    ]
})

export class AuthenticationDialogModule { }
