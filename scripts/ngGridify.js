(function(angular){
    'use strict';

    angular.module('ngGridify', [])
        .component('ngGridify', {
        bindings: {
            data: '=',
            order: '=',
            columns: '='
        },
        controllerAs: 'ctrl',
        controller: function ($http) {
            var vm = this;
            vm.reverse = false;
            vm.SortColumn = function SortColumn (column) {
                vm.order = column;
                vm.reverse = !vm.reverse;
            }
        },
        template: [
            '<table>',
            '<tr>',
            '<th ng-repeat="column in ctrl.columns"><a href="#" ng-click="ctrl.SortColumn(column)">{{column}}</a></th>',
            '</tr>',
            '<tr ng-repeat="person in ctrl.data | orderBy : ctrl.order : ctrl.reverse">',
            '<td>{{person.name}}</td>',
            '<td>{{person.age}}</td>',
            '<td>{{person.gender}}</td>',
            '<td>{{person.email}}</td>',
            '</tr>',
            '</table>'
        ].join('')
        });

})(angular);