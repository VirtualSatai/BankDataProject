bdBankApp.controller('overviewCtrl', function($scope, AccountsService, TransactionsService) {
  $scope.chartOptions = {
    credits: {
      enabled : false
    },
    legend: {
      enabled : false
    },
    chart: {
      type: 'column',
      width: 500
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

  $scope.refreshChartData = function() {
    AccountsService.fetchAccounts().success(function (data, status) {
      $scope.accounts = data.accounts;
      for(var i = 0; i < data.accounts.length - 1; i++) {
        $scope.chartOptions.xAxis.categories.push(data.accounts[i].name);
        $scope.chartOptions.series[0].data.push(data.accounts[i].balance);
		  }
    });
  }

  $scope.refreshAmountStats = function() {
    $scope.transactions = [];
    TransactionsService.fetchTransactionsByDate($scope.accounts[0].account_nbr, $scope.amountStats.year + '-01-01', $scope.amountStats.year + '-12-31').success(function (data, status) {
      angular.forEach(data.transactions, function(value, key){
        if(value.trx_ammount < $scope.amountStats.min) {
          $scope.transactions.push(value);
        }
      });
    });
  }
  
  $scope.refreshChartData();
});