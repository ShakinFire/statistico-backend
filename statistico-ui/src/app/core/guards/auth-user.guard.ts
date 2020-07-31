import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../../shared/services/base/authentication.service';

@Injectable()
export class AuthenticatedUserGuard implements CanActivate {
    constructor(
        private readonly authService: AuthenticationService,
    ) {}

    canActivate(): boolean {
        return this.authService.isLoggedIn();
    }
}
