(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$q', 'dataservice', 'logger'];
  /* @ngInject */
  function DashboardController($q, dataservice, logger) {
    var vm = this;

    vm.products = [];
    vm.title = 'Dashboard';
    vm.sort = {
      type    : 'price',
      reverse : true
    };
    vm.sortBy = function (propertyName) {
      vm.sort.reverse = (vm.sort.type === propertyName) ? !vm.sort.reverse : false;
      vm.sort.type = propertyName;
    };

    activate();

    function activate() {
      var promises = [getProducts()];
      return $q.all(promises).then(function() {
        logger.info('Activated Dashboard View');
      });
    }

    function getProducts() {
      return dataservice.getProducts().then(function(data) {
        vm.products = data;
        return vm.products;
      });
    }
  }

})();
