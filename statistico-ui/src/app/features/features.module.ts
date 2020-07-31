import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '../shared/shared.module';
import { BoardComponent } from './board/board.component';
import { ChartViewComponent } from './chart-view/chart-view.component';

@NgModule({
    imports: [
        SharedModule,
        BrowserModule,
        BrowserAnimationsModule,
    ],
    declarations: [
        BoardComponent,
        ChartViewComponent,
    ],
    providers: [
    ],
    exports: [
        BoardComponent,
        ChartViewComponent,
    ]
})

export class FeatureModule { }
