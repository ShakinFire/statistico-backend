import { Component, OnInit } from '@angular/core';
import { SubscribedComponent } from '../../shared/subscription-destroy/subscription-destroy.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent extends SubscribedComponent implements OnInit {
    constructor() {
        super();
    }

    public ngOnInit(): void {

    }

}
