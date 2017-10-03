var bdBankApp = angular.module('bdBankApp', ['ngRoute']);

bdBankApp.constant('APP_CONFIG', {
	SERVER_URL : 'http://46.101.77.229',
	SERVER_PORT : 'xxxxx',
	ACCOUNTS_SERVICE_NAME : 'accounts',
	TRANSACTIONS_SERVICE_NAME : 'transactions',
  CATEGORIES_SERVICE_NAME : 'categories'
})

.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/front.html',
        controller: 'frontCtrl'
      }).
      when('/transactions', {
        templateUrl: 'views/transactions.html'
      }).
      when('/transactions/:accountId', {
        templateUrl: 'views/transactions.html',
        controller: 'transactionsCtrl'
      }).
      when('/overview', {
        templateUrl: 'views/overview.html'
      });
}]);