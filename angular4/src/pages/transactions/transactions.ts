import { Component, HostListener } from '@angular/core';
import { Service } from '../../services/service';
import { ActivatedRoute } from '@angular/router';
import { DecimalPipe } from '@angular/common';

@Component({
    templateUrl: './transactions.html'
})
export class Transactions {

    private paramsSubscription;
    private transactions = [];
    private accounts = [];
    private selectedAccount;
    private currentPage;
	private lastScroll;

    constructor(
        private service: Service,
        private route: ActivatedRoute
    ) { 
        this.currentPage = 1;
    }

    ngOnInit() {
        this.service.fetchAccounts().then(
            data => {
                this.accountDataReady(data);
            }
        )
		this.lastScroll = (new Date).getTime()
    }

    private accountDataReady(data){
       this.accounts = data.accounts;
       this.paramsSubscription = this.route.params.subscribe(
            params => {
                for(let account of this.accounts){
                    if(account.account_nbr === params['id']){
                        this.selectAccount(account);
                    } else {
                        this.selectAccount(this.accounts[0]);
                    }
                }
            }
        );
    }

    private selectAccount(account){
        this.selectedAccount = account;
        this.selectedAccount.balance = account.balance;
        this.fetchTransactionData(this.selectedAccount, this.currentPage);
    }

    private fetchTransactionData(account, page){
        this.service.fetchTransactionsByPage(account.account_nbr, page)
        .then(data => {
            this.transactions = data['transactions'];
            for(let t of this.transactions) {
                t.clazz = t.trx_ammount > 0 ? "-kage" : "-abe";
            }
        })
    }

    private getMoreTransactions(){
        this.currentPage++;
        this.service.fetchTransactionsByPage(this.selectedAccount.account_nbr, this.currentPage)
        .then(data => {
            this.transactions = this.transactions.concat(data['transactions']);
        });
    }

    private toTheTop(){
        window.scrollTo(0, 0);
    }

    private isAccountSelected(account){
        return account.account_nbr == this.selectedAccount.account_nbr;
	}
    
	@HostListener('window:scroll', ['event'])
	private onWindowScroll(){
		let pos = (document.documentElement.scrollTop || document.body.scrollTop); // + document.documentElement.offsetHeight;
		let max = document.documentElement.scrollHeight;
		let clientHeight = document.documentElement.clientHeight
		
		let newTime = (new Date).getTime();
		if(newTime - this.lastScroll > 500 && (clientHeight + pos) / max > 0.9) {
			this.lastScroll = newTime;
			this.getMoreTransactions();
		}
	}

    ngOnDestroy() {
        this.paramsSubscription.unsubscribe();
    }
}
