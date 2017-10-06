import { Component } from '@angular/core';
import { Service } from '../../services/service';

@Component({
    templateUrl: './overview.html'
})
export class Overview {

    private accounts = [];
    private transactions = [];
    private chartData = {
        names: [],
        balances: []
    }

    private chart;
    private chartOptions = {
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        chart: {
            type: 'column',
            width: 500,
            height: 500
        },
        title: {
            text: 'Saldo lige nu'
        },
        xAxis: {
            categories: []
        },
        yAxis: {
            title: ''
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.2f} EUR</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Saldo',
            data: []
        }]
    };

    private amountStats = {
        year: 2016, 
        min: 100
    };

    constructor(
        private service: Service
    ) { }

    private saveInstance(chartInstance) {
        this.chart = chartInstance;
        this.refreshChartData();
    }

    private refreshChartData(){
        this.service.fetchAccounts().then(
            data => {
                this.dataReady(data);
            }
        )
    }

    private dataReady(data){
        this.accounts = data.accounts;
        this.chartData.names = []
        this.chartData.balances = []
        for(let i = 0; i < this.accounts.length; i++){
            this.chartData.names.push(this.accounts[i].name);
            this.chartData.balances.push(this.accounts[i].balance);
        }
        this.chart.xAxis[0].categories = this.chartData.names;
        this.chart.series[0].setData(this.chartData.balances);
    }

}