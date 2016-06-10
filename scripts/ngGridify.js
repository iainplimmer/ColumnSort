(function(angular){
    'use strict';

    angular.module('ngGridify', [])
        .component('ngGridify', {
        bindings: {
            data: '='
        },
        controllerAs: 'ctrl',
        controller: function ($http) {
            var vm = this;

            vm.orderBy = 'name'
            vm.reverse = false;

            vm.SortColumn = SortColumn;

            function SortColumn (column) {
                vm.orderBy = column;
                vm.reverse = !vm.reverse;
            }

        },
        template: [
            '<table>',
            '<tr>',
            '<th><a href="#" ng-click="ctrl.SortColumn(\'name\')">Name</a></th>',
            '<th><a href="#" ng-click="ctrl.SortColumn(\'age\')">Age</a></th>',
            '<th><a href="#" ng-click="ctrl.SortColumn(\'gender\')">Gender</a></th>',
            '<th><a href="#" ng-click="ctrl.SortColumn(\'email\')">Email</a></th>',
            '</tr>',
            '<tr ng-repeat="person in ctrl.data | orderBy : ctrl.orderBy:ctrl.reverse">',
            '<td>{{person.name}}</td>',
            '<td>{{person.age}}</td>',
            '<td>{{person.gender}}</td>',
            '<td>{{person.email}}</td>',
            '</tr>',
            '</table>'
        ].join('')
        });

})(angular);