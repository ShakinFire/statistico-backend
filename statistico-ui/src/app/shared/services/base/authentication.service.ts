import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Subject, throwError } from 'rxjs';
import { User } from '../../interfaces/user.interface';
import { UsersDataService } from '../data/user.data.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

    public currentUserChanged = new Subject<User>();

    constructor(
        private readonly usersDataService: UsersDataService,
    ) { }

    public setLocalStorage(responseObj): void {
        // Adds the expiration time defined on the JWT to the current moment
        this.currentUserChanged.next(responseObj.user);
        // const [amount, timeLabel] = responseObj.expiresIn;
        const expiresAt = moment().add(60, 's');

        localStorage.setItem('token', responseObj.token);
        localStorage.setItem('expiresAt', JSON.stringify(expiresAt.valueOf()) );
    }

    public logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('expiresAt');
        this.currentUserChanged.next(null);
    }

    public isLoggedIn(): boolean {
        const expiresAt = this.getExpiration();
        return moment().isBefore(expiresAt);
    }

    public isLoggedOut(): boolean {
        return !this.isLoggedIn();
    }

    public getExpiration() {
        const expiration = localStorage.getItem('expiresAt');
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }

    public getCurrentUser(): void {
        this.usersDataService.getCurrentUser()
            .pipe(
                catchError((error) => {
                    this.currentUserChanged.next(null);
                    return throwError(error);
                }),
            )
            .subscribe((user: User) => {
                this.currentUserChanged.next(user);
            });
    }
}
