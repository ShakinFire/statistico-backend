import { cloneDeep } from 'lodash';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BoardDataService } from '../../shared/services/data/board.data.service';
import { takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material';
import { SubscribedComponent } from '../../shared/subscription-destroy/subscription-destroy.component';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})

export class BoardComponent extends SubscribedComponent implements OnInit {
    public isLoaded = false;
    public countriesToList: any[];
    public constCountries: any[];
    public selectedValue: any;
    public selectedValueImageUrl: string;

    public countriesControl: FormControl = new FormControl();
    public countriesFilterControl: FormControl = new FormControl();
    @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

    constructor(
        private readonly boardDataService: BoardDataService,
    ) {
        super();
    }

    public ngOnInit(): void {
        this.countriesFilterControl.valueChanges
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe(() => {
                this.filterBanks();
            });

        this.boardDataService.getDailyReportAllCountries()
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe((stats) => {
                this.isLoaded = true;
                this.countriesToList = [
                    { ...stats.Global, Country: 'Global' },
                    ...stats.Countries,
                ];
                this.constCountries = cloneDeep(this.countriesToList);
                this.selectedValue = this.countriesToList[0];
                this.countriesControl.setValue(this.countriesToList[0]);
            });
    }

    public handleSelectionChange(event: any): void {
        this.selectedValueImageUrl = `https://www.countryflags.io/${event.value.CountryCode}/flat/24.png`;
        this.selectedValue = event.value;
        this.boardDataService.changeSelectedCountry(event.value.Slug);
    }

    private filterBanks() {
        if (!this.countriesToList) {
            return;
        }
        // get the search keyword
        let search = this.countriesFilterControl.value;

        if (!search) {
            this.countriesToList = this.constCountries;
            return;
        } else {
            search = search.toLowerCase();
        }
        // filter the banks
        this.countriesToList = this.constCountries.filter((country) => country.Country.toLowerCase().indexOf(search) > -1);
    }

}
