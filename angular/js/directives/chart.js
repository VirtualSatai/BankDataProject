bdBankApp.directive('chart', function () {
  return {
    restrict: 'E',
    template: '<div></div>',
    scope: {
      options: '='
    },
    link: function (scope, element, attrs) {
      var chart = Highcharts.chart(element[0], scope.options);
      scope.$watch("options.xAxis.categories", function (newValue) {
      	if(newValue) {
        	chart.xAxis[0].update({categories: newValue}, true);
        }
      }, true);
      scope.$watch("options.series[0].data", function (newValue) {
      	if(newValue) {
    		  chart.series[0].setData(newValue, true);
      	}
      }, true);
    }
  };
});