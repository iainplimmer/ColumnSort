(function(window, angular){
    'use strict';

    angular.module('ngGridify',[])

        //  Factory that is designed to return data about people
        .factory('fctPeople', function($http) {
            return {
                GetAll : getAllPeople
            }

            function getAllPeople () {
                return $http.get('./resources/people.json');
            };    
        })

        //  Controller used to return the people scope out to the page
        .controller('ctrlPeople', function (fctPeople) {
            var vm = this;

            vm.data = [];
            vm.orderBy = 'name'
            vm.reverse = false;

            vm.$onInit = GetAll;
            vm.SortColumn = SortColumn;

            function SortColumn (column) {
                vm.orderBy = column;
                vm.reverse = !vm.reverse;
            }

            function GetAll () {
                fctPeople.GetAll().then(function success(response){
                    vm.data = response.data;    
                })
            };
            
        })

})(window, angular);