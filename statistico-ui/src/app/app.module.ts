import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from './core/interceptors/authentication.interceptor';
import { AuthenticatedUserGuard } from './core/guards/auth-user.guard';
import { FeatureModule } from './features/features.module';
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from './common/common.module';

@NgModule({
    imports: [
        SharedModule,
        BrowserModule,
        FeatureModule,
        CommonModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ChartsModule,
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthenticationInterceptor,
            multi: true,
        },
        AuthenticatedUserGuard,
    ],
    bootstrap: [AppComponent],
})

export class AppModule { }
