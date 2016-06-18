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
            controller: function ($scope) {
                var vm = this;
                
                vm.reverse = false;
                vm.pages = 0;
                vm.currentpage = 0;
                vm.rowcount = 0;

                //  Function that sorts the grid by column name, opposite to the current sort
                vm.SortColumn = function SortColumn (column) {
                    vm.config.order = column;
                    vm.reverse = !vm.reverse;
                }

                //  Function that allows the user to change page
                vm.ChangePage = function ChangePage (page) {                
                    vm.currentpage = page;
                }
            
                // We setup a watch on the collection to bind the paging
                $scope.$watchCollection('ctrl.config.data', function (data) {                                
                    vm.pages = CalculatePages(data.length, vm.config.itemsPerPage);   
                    vm.rowcount = data.length;                 
                });


                //  Calculates the number of pages as we do this function more than once
                function CalculatePages(numberOfItems, itemsPerPage) {
                    return Math.ceil(numberOfItems / itemsPerPage);
                }

                //  Creates an array of a calculated size so we can iterate over it later for the pages
                vm.GetNumber = function (num) {
                    try {
                        return new Array(num);
                    }   
                    catch(err) {
                        console.error('You need to provide the itemsPerPage config property to ng-gridify')
                    }    
                }


            },
            template: [
                '<div>{{ctrl.rowcount}} records found.</div>',
                '<table class="{{ctrl.config.class}}" ng-show="ctrl.rowcount > 0">',
                '<tr>',

                //  HEADER: We want to loop over the column names one by one, and sow the display names
                '<th ng-repeat="column in ctrl.config.columns" width="{{column.width}}">',
                '<a href="#" ng-click="ctrl.SortColumn(column.column)">{{column.display}}</a> ',
                ' <span ng-show="ctrl.config.order == column.column && ctrl.reverse" class="glyphicon glyphicon-triangle-bottom"></span>',
                ' <span ng-show="ctrl.config.order == column.column && !ctrl.reverse" class="glyphicon glyphicon-triangle-top"></span>',
                '</th>',

                //  We show and hide this column if a click event has been provided for the item row
                '<th ng-show="ctrl.config.itemClick"></th>',
                
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
                '<td ng-show="ctrl.config.itemClick" ><button class="btn btn-info"type="button" ng-click="ctrl.config.itemClick(item)">{{ctrl.config.itemClickText}}</button></td>',
                '</tr>',
                '</table>',

                //  PAGING
                '<nav ng-show="ctrl.config.paging">',
                '<ul class="pagination">',
                '<li ng-repeat="item in ctrl.GetNumber(ctrl.pages) track by $index" class="page-item"><a class="page-link" href="#" ng-click="ctrl.ChangePage($index)">{{$index+1}}</a></li>',
                '</ul>',
                '</nav>'
            ].join('')
        });

})(angular);
