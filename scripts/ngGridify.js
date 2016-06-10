(function(angular){
    'use strict';

    angular.module('ngGridify', [])
        .component('ngGridify', {
        bindings: {
            config: '='
        },
        controllerAs: 'ctrl',
        controller: function ($http) {
            var vm = this;
            vm.reverse = false;
            vm.SortColumn = function SortColumn (column) {
                vm.config.order = column;
                vm.reverse = !vm.reverse;
            }
        },
        template: [
            '<table><tr>',

            //  HEADER: We want to loop over the column names one by one, and sow the display names
            '<th ng-repeat="column in ctrl.config.columns"><a href="#" ng-click="ctrl.SortColumn(column.column)">{{column.display}}</a></th>',
            
            '</tr>',

            //  ROW: Now we repeat over the items in the JSON, and dynamically create the columns
            '<tr ng-repeat="item in ctrl.config.data | orderBy : ctrl.config.order : ctrl.reverse">',
            '<td ng-repeat="column in ctrl.config.columns">',

            //  COLUMN: Handling of text types shown
            '<span ng-show="column.type==\'text\' || column.type==\'number\'">{{item[column.column]}}</span>',
            
            //  COLUMN: Handling of email types shown
            '<a href="mailto:{{item[column.column]}}" ng-show="column.type==\'email\'">{{item[column.column]}}</a></span>',

            //  COLUMN: Handling of link types shown
            '<a href="{{item[column.column]}}" ng-show="column.type==\'link\'" target="_blank">{{item[column.column]}}</a></span>',
            
            '</td>',
            '</tr>',
            '</table>'
        ].join('')
        });

})(angular);