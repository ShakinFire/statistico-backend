import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Label, Color } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';
import { filter, switchMap, takeUntil, map } from 'rxjs/operators';
import { SubscribedComponent } from '../../shared/subscription-destroy/subscription-destroy.component';
import { BoardDataService } from '../../shared/services/data/board.data.service';

@Component({
    selector: 'app-chart-view',
    templateUrl: './chart-view.component.html',
    styleUrls: ['./chart-view.component.scss']
})

export class ChartViewComponent extends SubscribedComponent implements OnInit {
    public lineChartData: ChartDataSets[] = [
        { data: [20, 30, 59, 69, 81, 100, 140], label: 'Total Cases' },
    ];
    public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartOptions = {
        responsive: false, scales: {
            yAxes: [{
                gridLines: {
                    drawBorder: false,
                },
            }],
            xAxes: [{
                gridLines: {
                    display: false,
                },
            }],
        },
    }; // @todo make it true
    public lineChartColors: Color[] = [
        {
            borderColor: 'rgb(51,204,255)',
            backgroundColor: 'transparent',
        },
    ];
    public lineChartType = 'line';

    constructor(private readonly boardDataService: BoardDataService) {
        super();
    }

    public ngOnInit(): void {
        this.boardDataService.selectedCountryChanged
            .pipe(
                filter((countryName) => !!countryName),
                switchMap((countryName) => {
                    if (countryName === 'Global') {
                        return this.boardDataService.getTotalTrendingCases();
                    }

                    return this.boardDataService.getDayOneAllStatus(countryName);
                })
            )
            .subscribe((countryDayOneData) => {
                console.log(countryDayOneData);
                const mappedChartData = countryDayOneData.reduce((dataForChart, dataOfDay) => ({
                    labels: [
                        ...dataForChart.labels,
                        this.localizedDateMonthNoYear(dataOfDay.Date),
                    ],
                    data: [
                        ...dataForChart.data,
                        dataOfDay.Cases || dataOfDay.totalConfirmed,
                    ],
                }), { labels: [], data: [] });

                this.lineChartLabels = mappedChartData.labels;
                this.lineChartData[0].data = mappedChartData.data;
            });
    }

    public localizedDateMonthNoYear(date: string) {
        return new Intl.DateTimeFormat('default', { month: 'short', day: '2-digit' })
            .format(moment(date).toDate());
    }
}
