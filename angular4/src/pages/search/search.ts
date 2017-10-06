import { Component } from '@angular/core';
import { Service } from '../../services/service';

@Component({
    templateUrl: './search.html'
})
export class Search {
    constructor(
        private service: Service
    ) { this.refreshChartData() }

    private accounts = [];
    private transactions = [];
    private chartData = {
        names: [],
        balances: []
    }

    private amountStats = {
        year: 2016,
        min: 100
    };

    private refreshChartData(){
        this.service.fetchAccounts().then(
            data => {
                this.dataReady(data);
            }
        )
    }

    private dataReady(data){
        this.accounts = data.accounts;
    }

    private refreshAmountStats(){
        this.transactions = [];
        this.service.fetchTransactionsByDate(this.accounts[0].account_nbr, this.amountStats.year + '-01-01', this.amountStats.year + '-12-31').then(
            data => {
                for (let transaction of data['transactions']) {
                   if(transaction.trx_ammount < this.amountStats.min){
                       this.transactions.push(transaction);
                   }
                }
            }
        )
    }
}
