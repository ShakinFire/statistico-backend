import { Routes } from '@angular/router';
import { TestComponent } from './shared/test/test.component';
import { AuthenticatedUserGuard } from './core/guards/auth-user.guard';
import { HomeComponent } from './common/home/home.component';

export const appStates: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'test',
        component: TestComponent,
        canActivate: [AuthenticatedUserGuard]
    },
];
