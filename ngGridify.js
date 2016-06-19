(function(angular, window){
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
                var columnsToConvertToFloat = [];
                var columnsToConvertToDate = [];

                //  Properties available on the view                
                vm.reverse = false;
                vm.pages = 0;
                vm.currentpage = 0;
                vm.rowcount = 0;

                //  Functions that are available on the view
                vm.SortColumn = sortColumn;
                vm.ChangePage = changePage;
                vm.GetNumber = getNumber;
                vm.ExportCSV = exportCSV;
            
                //  Let's watch the collection of columns and determine which needs to be converted to a number for the sorting of 
                //  number based data
                $scope.$watchCollection('ctrl.config.columns', function (columns) {                  
                    columns.map(function (column) {
                        if (column.type === 'number') {
                            columnsToConvertToFloat.push(column.column)
                        }
                        else if (column.type == 'date') {
                            columnsToConvertToDate.push(column.column)
                        }
                    });
                })

                //  We setup a watch on the collection to bind the paging, convert any number based columns to floats
                //  to allow correct sorting and then finally set the rowcount.
                $scope.$watchCollection('ctrl.config.data', function (data) {   

                    //  Convert each column that is required on numbers and dates to allow sorting 
                    data.map(function (itemToConvert){
                        columnsToConvertToFloat.map(function (column) {
                            itemToConvert[column] = parseFloat(itemToConvert[column]);
                        });
                        columnsToConvertToDate.map(function (column) {
                            itemToConvert[column] = new Date(itemToConvert[column]);
                        });
                    });  

                    if (data) {
                        vm.pages = calculatePages(data.length, vm.config.itemsPerPage);   
                        vm.rowcount = data.length;
                    }                 
                });

                //  Function that takes the columns collection, creates a CSV representation of the data, and pushes it to the browser
                function exportCSV () {

                    var csvContent = "data:text/csv;charset=utf-8,";

                    vm.config.data.map(function (item){                            
                        csvContent += Object.keys(item).map(function (k) {
                            if (k !== '$$hashKey'){
                                return item[k]
                            }
                        }).join(",") + '\n';
                    })

                    //  Open the CSV in a new window here
                    var encodedUri = encodeURI(csvContent);
                    window.open(encodedUri);
                }

                //  Calculates the number of pages as we do this function more than once
                function calculatePages (numberOfItems, itemsPerPage) {
                    return Math.ceil(numberOfItems / itemsPerPage);
                }

                //  Function that sorts the grid by column name, opposite to the current sort
                function sortColumn (column) {
                    vm.config.order = column;
                    vm.reverse = !vm.reverse;
                }

                //  Function that allows the user to change page
                function changePage (page) {                
                    vm.currentpage = page;
                }

                //  Creates an array of a calculated size so we can iterate over it later for the pages
                function getNumber (num) {
                    try {
                        return new Array(num);
                    }   
                    catch(err) {
                        console.error('You need to provide the itemsPerPage config property to ng-gridify')
                    }    
                }


            },
            template: [
                '<div class="nggridify-rowcount">{{ctrl.rowcount}} records found.</div>',
                '<div class="nggridify-export"><button ng-show="ctrl.config.export" ng-click="ctrl.ExportCSV()">Export to CSV</button></div>',
                
                '<table class="{{ctrl.config.class}}" ng-show="ctrl.rowcount > 0">',
                '<tr>',

                //  HEADER: We want to loop over the column names one by one, and sow the display names
                '<th ng-repeat="column in ctrl.config.columns" width="{{column.width}}">',
                '<a href="#null" ng-click="ctrl.SortColumn(column.column)">{{column.display ? column.display : column.column}}</a> ',
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
                '<span ng-show="column.type==\'text\' || column.type==\'number\' || !column.type">{{item[column.column]}}</span>',

                //  COLUMN: Handling of 'date' types shown
                '<span ng-show="column.type==\'date\' && item[column.column]">{{ item[column.column] | date:(!column.format) ? "dd MMMM yyyy" : column.format}}</span>',

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
                '<li ng-repeat="item in ctrl.GetNumber(ctrl.pages) track by $index" class="page-item"><a class="page-link" href="#null" ng-click="ctrl.ChangePage($index)">{{$index+1}}</a></li>',
                '</ul>',
                '</nav>'
            ].join('')
        });

})(angular, window);
