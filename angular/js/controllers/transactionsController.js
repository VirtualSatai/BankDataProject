bdBankApp.controller('transactionsCtrl', function($scope, $routeParams, AccountsService, TransactionsService) {
	AccountsService.fetchAccounts().success(function (data, status) {
        $scope.accounts = data.accounts;
        angular.forEach($scope.accounts, function(value, key) {
  			if(value.account_nbr === $routeParams.accountId) {
  				$scope.selectAccount(value);
  			} else {
				$scope.selectAccount($scope.accounts[0]);  
			}
		});
    });
	
	$scope.page = 1;
	$scope.selectAccount = function(account) {
		$scope.selectedAccount = account;
		$scope.selectedAccount.balance = "873,00";
		$scope.transactions = [];
		TransactionsService.fetchTransactionsByPage(account.account_nbr, $scope.page).success(function (data, status) {
        	$scope.transactions = data.transactions;
    	});
	}

	$scope.getMoreTransactions = function() {
		if($scope.selectedAccount!=null) {
			$scope.page++;
			TransactionsService.fetchTransactionsByPage($scope.selectedAccount.account_nbr, $scope.page).success(function (data, status) {
        		$scope.transactions = $scope.transactions.concat(data.transactions);
    		});
		}
	}

	$scope.isAccountSelected = function(account) {
		if($scope.selectedAccount!=null) {
			return account.account_nbr === $scope.selectedAccount.account_nbr;
		}
	}
});