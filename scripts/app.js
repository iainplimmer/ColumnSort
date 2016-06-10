(function(window, angular){
    'use strict';

    angular.module('MyApp',['ngGridify'])
    .controller('ctrlPeople', function ($http) {
        var vm = this;
        vm.$onInit = function () { 
            $http.get('./resources/people.json').then(function success(response){            

                //  Let's make a new config object that allows us to just bind the data to columns in one
                vm.config = {
                    data : response.data,
                    order : 'name', 
                    columns: [
                        { column: 'name', display: 'Name' }, 
                        { column: 'age', display: 'Age' },
                        { column: 'gender', display: 'Gender' },
                        { column: 'email', display: 'Email' },
                    ]         
                };

                  
            });
        };
    })
        
})(window, angular);