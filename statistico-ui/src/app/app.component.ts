import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './shared/services/base/authentication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    constructor(
        private readonly authService: AuthenticationService,
    ) {}

    public ngOnInit(): void {
        this.authService.getCurrentUser();
    }
}
