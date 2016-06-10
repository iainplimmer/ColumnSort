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
            '<th ng-repeat="column in ctrl.columns"><a href="#" ng-click="ctrl.SortColumn(column.column)">{{column.display}}</a></th>',
            '</tr>',
            '<tr ng-repeat="item in ctrl.data | orderBy : ctrl.order : ctrl.reverse">',
            '<td ng-repeat="column in ctrl.columns">{{item[column.column]}}</td>',
            '</tr>',
            '</table>'
        ].join('')
        });

})(angular);