import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { FeatureModule } from '../features/features.module';

@NgModule({
    imports: [
        SharedModule,
        BrowserModule,
        BrowserAnimationsModule,
        FeatureModule,
    ],
    declarations: [
        HomeComponent,
    ],
    providers: [
    ],
    exports: [
        HomeComponent,
    ]
})

export class CommonModule { }
