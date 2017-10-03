bdBankApp.factory('AccountsService', function($http, APP_CONFIG){
  return {
    //fetches all accounts
    fetchAccounts: function() {
      var _url = APP_CONFIG.SERVER_URL + ':' + APP_CONFIG.SERVER_PORT + '/' + APP_CONFIG.ACCOUNTS_SERVICE_NAME;
    	return $http.get(_url);
    }
  };
})

.factory('CategoriesService', function($http, APP_CONFIG){
  return {
    //fetches list of all categories with sub-categories
    fetchAccounts: function() {
      var _url = APP_CONFIG.SERVER_URL + ':' + APP_CONFIG.SERVER_PORT + '/' + APP_CONFIG.CATEGORIES_SERVICE_NAME;
    	return $http.get(_url);
    }
  };
})

.factory('TransactionsService', function($http, APP_CONFIG){
  var _baseUrl = APP_CONFIG.SERVER_URL + ':' + APP_CONFIG.SERVER_PORT + '/' + APP_CONFIG.TRANSACTIONS_SERVICE_NAME;
  return {
    //fetches a page of transactions for a given account
    //accNbr format: "7454-3742221"
    fetchTransactionsByPage: function(accountId, page) {
		  var _url = _baseUrl + '?arg1=fetchByPage&arg2=' + accountId + '&arg3=' + page;
		  return $http.get(_url);
    },
    //fetches transactions in date interval for a given account
    //accNbr format: "7454-3742221"
    //date format: "2016-03-21" 
    fetchTransactionsByDate: function(accountId, fromDate, toDate) {
      var _url = _baseUrl + '?arg1=fetchByDate&arg2=' + accountId + '&arg3=' + fromDate + '&arg4=' + toDate;
      return $http.get(_url);
    }
  };
});