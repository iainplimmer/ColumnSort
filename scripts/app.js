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
                    class : 'table',
                    columns: [
                        { column: 'name', display: 'Name', type: 'text' }, 
                        { column: 'age', display: 'Age', type: 'number' },
                        { column: 'gender', display: 'Gender', type: 'text' },
                        { column: 'email', display: 'Email', type: 'email' },
                        { column: 'website', display: 'link', type: 'link' }
                    ]         
                };

                  
            });
        };
    })
        
})(window, angular);