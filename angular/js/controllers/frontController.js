bdBankApp.controller('frontCtrl', function($scope, AccountsService) {
	AccountsService.fetchAccounts().success(function (data, status) {
        $scope.accounts = data.accounts;
    });
});