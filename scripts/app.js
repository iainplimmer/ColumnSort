(function(window, angular){
    'use strict';

    angular.module('MyApp',['ngGridify'])
    .controller('ctrlPeople', function ($http) {
        var vm = this;
        vm.$onInit = function () { 
            $http.get('./resources/people.json').then(function success(response){            
                vm.data = response.data;    
                vm.order = 'age';    
                vm.columns = ['name', 'age', 'gender', 'email']      
            });
        };
    })
        
})(window, angular);