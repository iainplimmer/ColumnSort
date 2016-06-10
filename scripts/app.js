(function(window, angular){
    'use strict';

    angular.module('MyApp',['ngGridify'])
    .controller('ctrlPeople', function ($http) {
        var vm = this;
        vm.$onInit = function () { 
            $http.get('./resources/people.json').then(function success(response){            
                vm.data = response.data;              
            });
        };
    })
        
})(window, angular);