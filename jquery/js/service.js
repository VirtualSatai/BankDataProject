var service = (function(){
	"use strict";

	var SERVER_URL = "http://46.101.77.229";
	var SERVER_PORT = "xxxxx";
	var ACCOUNT_SERVICE_URL = SERVER_URL + ":" + SERVER_PORT + "/accounts";
	var TRANSACTIONS_SERVICE_URL = SERVER_URL + ":" + SERVER_PORT + "/transactions";
	var CATEGORIES_SERVICE_URL = SERVER_URL + ":" + SERVER_PORT +  + "/categories";

	//fetches all accounts
	var fetchAccounts = function(onSuccess){
		var jqxhr = $.getJSON(ACCOUNT_SERVICE_URL, function(response) {
			onSuccess(response); //response.accounts to get list of accounts
		})
		.fail(function(d, status, error){
			console.log("fetching account data failed, status: " + status + ", error: " + error);
		});
	};

	//fetches a page of transactions for a given account
	//accNbr format: "7454-3742221"
	var fetchTransactionsByPage = function(accNbr, page, onSuccess){
		var requestURL = TRANSACTIONS_SERVICE_URL + "?arg1=fetchByPage&arg2=" + accNbr + "&arg3=" + page;
		var jqxhr = $.getJSON(requestURL, function(response) {
			onSuccess(response); //response.transactions to get list of transactions
		})
		.fail(function(d, status, error){
			console.log("fetching transactions by page failed, status: " + status + ", error: " + error);
		});
	};

	//fetches transactions in date interval for a given account
	//accNbr format: "7454-3742221"
	//date format: "2016-03-21" 
	var fetchTransactionsByDate = function(accNbr, fromDate, toDate, onSuccess){
		var requestURL = TRANSACTIONS_SERVICE_URL + "?arg1=fetchByDate&arg2=" + accNbr + "&arg3=" + fromDate + "&arg4=" + toDate;	
		var jqxhr = $.getJSON(requestURL, function(response) {
			onSuccess(response); //response.transactions to get list of transactions
		})
		.fail(function(d, status, error){
			console.log("fetching transactions by date failed, status: " + status + ", error: " + error);
		});	
	};

	//fetches list of all categories with sub-categories
	var fetchCategories = function(onSuccess){
		var jqxhr = $.getJSON(CATEGORIES_SERVICE_URL, function(response) {
			onSuccess(response);
		})
		.fail(function(d, status, error){
			console.log("fetching categories failed, staus: " + status + ", error: " + error);
		});
	};

	//public service functions to fetch data
	return {
		fetchAccounts : fetchAccounts,
		fetchTransactionsByPage : fetchTransactionsByPage,
		fetchTransactionsByDate : fetchTransactionsByDate,
		fetchCategories : fetchCategories
	}
})();
