(function(window, angular){
    'use strict';

    angular.module('MyApp',['ngGridify'])
    .controller('ctrlPeople', function ($http) {
        var vm = this;
        vm.$onInit = function () { 
            $http.get('./resources/people.json').then(function success(response){            


                vm.clicker = function (item) {
                    console.log('im working, here\'s the value', item);
                   
                }

                var config = {
                    data : response.data,
                    order : 'name', 
                    class : 'table',
                    itemClick : vm.clicker,
                    itemClickText : 'Open click event',
                    itemsPerPage: 10,
                    columns: [
                        { column: 'name', display: 'Name', type: 'text' }, 
                        { column: 'age', display: 'Age', type: 'number' },
                        { column: 'gender', display: 'Gender', type: 'text' },
                        { column: 'email', display: 'Email', type: 'email' },
                        { column: 'website', display: 'Link', type: 'link' }
                    ]         
                };

                //  Let's make a new config object that allows us to just bind the data to columns in one
                vm.config = config; 

                  
            });
        };
    })
        
})(window, angular);