import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AuthenticationDialogComponent } from '../authentication-dialog/authentication-dialog.component';
import { AuthenticationService } from '../services/base/authentication.service';
import { User } from '../interfaces/user.interface';
import { SubscribedComponent } from '../subscription-destroy/subscription-destroy.component';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent extends SubscribedComponent implements OnInit {
    public currentUser: User;

    constructor(
        private readonly router: Router,
        private readonly authService: AuthenticationService,
        private readonly dialog: MatDialog,
    ) {
        super();
    }

    public ngOnInit(): void {
        this.authService.currentUserChanged
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe((user) => {
                this.currentUser = user;
            });
    }

    public redirectToHome(): void {
        this.router.navigateByUrl('/');
    }

    public redirectToProfile(): void {
        // this.router.navigateByUrl(`/users/${this.loggedUser.id}`);
    }

    public redirectAuth(tabIndex: number): void {
        this.dialog.open(AuthenticationDialogComponent, {
                width: '40%',
                data: {
                    selectedIndex: tabIndex,
                },
            });
    }

    public logout(): void {
        this.authService.logout();
    }

}
