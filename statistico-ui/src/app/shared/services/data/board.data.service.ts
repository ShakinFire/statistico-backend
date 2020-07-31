import { Injectable } from '@angular/core';
import { HttpService } from '../base/http.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class BoardDataService {
    public selectedCountryChanged: BehaviorSubject<string> = new BehaviorSubject<string>('Global');
    public constructor(private readonly httpService: HttpService) {}

    public changeSelectedCountry(selectedCountry: string): void {
        this.selectedCountryChanged.next(selectedCountry);
    }

    public getDailyReportAllCountries(): Observable<any> {
        return this.httpService.get<any>(`https://api.covid19api.com/summary`);
    }

    public getDayOneAllStatus(countryName: string): Observable<any> {
        return this.httpService.get<any>(`https://api.covid19api.com/total/dayone/country/${countryName}/status/confirmed`);
    }

    public getTotalTrendingCases(): Observable<any> {
        return this.httpService.get<any>(`https://api.coronatracker.com/v3/stats/worldometer/totalTrendingCases?limit=100`);
    }
}
