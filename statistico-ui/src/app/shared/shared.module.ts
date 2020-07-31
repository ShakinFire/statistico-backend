import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatOptionModule,
    MatSelectModule,
    MatSidenavModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatNativeDateModule,
    MatDatepickerModule,
} from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NavigationComponent } from './navigation/navigation.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationDialogModule } from './authentication-dialog/authentication-dialog.module';
import { HttpService } from './services/base/http.service';
import { UsersDataService } from './services/data/user.data.service';
import { AuthenticationService } from './services/base/authentication.service';
import { TestComponent } from './test/test.component';
import { BoardDataService } from './services/data/board.data.service';
import { ChartsModule } from 'ng2-charts';

@NgModule({
    imports: [
        CommonModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatTabsModule,
        MatDialogModule,
        MatCardModule,
        MatSidenavModule,
        MatListModule,
        MatSelectModule,
        MatOptionModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        HttpClientModule,
        MatDatepickerModule,
        MatNativeDateModule,
        AuthenticationDialogModule,
        MatProgressSpinnerModule,
        NgxMatSelectSearchModule,
        ChartsModule,
    ],
    declarations: [
        NavigationComponent,
        TestComponent,
    ],
    providers: [
        HttpService,
        UsersDataService,
        BoardDataService,
        AuthenticationService,
    ],
    exports: [
        NavigationComponent,
        TestComponent,
        CommonModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatTabsModule,
        MatDialogModule,
        MatCardModule,
        MatSidenavModule,
        MatListModule,
        MatSelectModule,
        MatOptionModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        HttpClientModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatProgressSpinnerModule,
        NgxMatSelectSearchModule,
        ChartsModule,
    ],
})

export class SharedModule { }
