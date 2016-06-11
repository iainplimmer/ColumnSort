(function(angular){
    'use strict';

    angular.module('ngGridify', [])
        .filter('offset', function () {
            return function (input, start) {
                if (!input || !input.length) { return; }
                start = +start; //parse to int
                return input.slice(start);
            }
        })
        .component('ngGridify', {
        bindings: {
            config: '='
        },
        controllerAs: 'ctrl',
        controller: function ($http, $scope) {
            var vm = this;
            vm.reverse = false;
            vm.pages = 0;
            vm.currentpage = 0;

            //  Function that sorts the grid by column name, opposite to the current sort
            vm.SortColumn = function SortColumn (column) {
                vm.config.order = column;
                vm.reverse = !vm.reverse;
            }

            //  Function that allows the user to change page
            vm.ChangePage = function ChangePage (page) {                
                vm.currentpage = page;
            }
          
            //  We need to wait until we have the data, then let's create the page numbers
            $scope.$watch('ctrl.config.data', function (data) {
                    if (data) {
                        vm.pages = Math.ceil(data.length / vm.config.itemsPerPage);
                    }  
                }
            );

            vm.GetNumber = function (num) {
                return new Array(num);       
            }

        },
        template: [
            '<table class="{{ctrl.config.class}}">',
            '<tr>',

            //  HEADER: We want to loop over the column names one by one, and sow the display names
            '<th ng-repeat="column in ctrl.config.columns"><a href="#" ng-click="ctrl.SortColumn(column.column)">{{column.display}}</a></th>',
            
            '</tr>',

            //  ROW: Now we repeat over the items in the JSON, and dynamically create the columns
            '<tr ng-repeat="item in ctrl.config.data| orderBy: ctrl.config.order : ctrl.reverse | offset:(ctrl.currentpage * ctrl.config.itemsPerPage) | limitTo: ctrl.config.itemsPerPage">',
            '<td ng-repeat="column in ctrl.config.columns">',

            //  COLUMN: Handling of 'text' and 'number' types shown
            '<span ng-show="column.type==\'text\' || column.type==\'number\'">{{item[column.column]}}</span>',
            
            //  COLUMN: Handling of 'email' types shown
            '<a href="mailto:{{item[column.column]}}" ng-show="column.type==\'email\'">{{item[column.column]}}</a></span>',

            //  COLUMN: Handling of 'link' types shown
            '<a href="{{item[column.column]}}" ng-show="column.type==\'link\'" target="_blank">{{item[column.column]}}</a></span>',
            
            '</td>',

            //  COLUMN: Show the item click column if a function has been defined
            '<td><button class="btn btn-info" ng-show="ctrl.config.itemClick" type="button" ng-click="ctrl.config.itemClick(item)">{{ctrl.config.itemClickText}}</button></td>',
            '</tr>',
            '</table>',

            //  PAGING
            '<nav>',
            '<ul class="pagination">',
            '<li ng-repeat="item in ctrl.GetNumber(ctrl.pages) track by $index" class="page-item"><a class="page-link" href="#" ng-click="ctrl.ChangePage($index)">{{$index+1}}</a></li>',
            '</ul>',
            '</nav>'
        ].join('')
        });

})(angular);