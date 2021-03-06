ngGridify is a quick and easy way to show some data on the page, and be able to sort it, configure the columns and bind some sort of javascript function to a button on each line if you want to. You can event include the option to export the content to a CSV file.

It's built with AngularJS 1.5.x and Bootstrap (although it's not required) and you can knock some data onto a page before you can say Bingo.

**Installation**

To install ngGridify, you just need to .........

_npm install ng-gridify_

**Required stuff**

Only two Javascript files are actually required, but I recommend you use the Bootstrap CSS file in addition. After you have run 'npm install', just make a reference to the following resources in your HTML document.

    <script src="./node_modules/angular/angular.min.js"></script>
    <script src="./node_modules/ng-gridify/ngGridify.js"></script>

    <link href="/node_modules/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

**Using the component**

To use the component itself, you just need to add the reference in your angular module like so...

    angular.module('YourApplication', ['ngGridify'])

Then you can use the component like this...

    <ng-gridify config='config'></ng-gridify>

Notice that the component takes a 'config' object? More about that...

**The Config Object**

The config object contains the data, and any options that you want to apply to the component, such as whether to show paging, the ability to export, how many items appear on a single page, and the columns that are required to be built by the component; including their types.

Let's say that we have this very basic collection of JSON data:

    var data = [{
        "website": "http://www.google.com",
        "age": 40,
        "name": "Mclean Roth",
        "email": "mcleanroth@kineticut.com",
        "createddate":"11 June 2016"
    },
    {
        "website": "http://www.google.co.uk",
        "age": 25,
        "name": "Marisa Sexton",
        "email": "marisasexton@kineticut.com",
        "createddate":"10 June 2016"
    },
    {
        "website": "http://www.iainplimmer.co.uk",
        "age": 33,
        "name": "Aline Baird",
        "email": "alinebaird@kineticut.com",
        "createddate":"9 March 2016"
    }];

We need to create a config object that we pass to the component. The example below will show two items per page, paging options turned on, a default ordering of the 'name' column. 

* **text** - shows the value on the page as it appears in the JSON data.
* **number** - shows the value on the page as it appears in the JSON data. *Invalid numbers will be returned as null.
* **email** - creates a 'mailto' link on the data.
* **date** - formats the column as a date, you can pass in an additional 'format' property here. *Invalid dates will be returned as null.
* **link** - you guessed it, creates a hyperlink with a new window target. 

Finally, let's put that together in the config object that we would pass. An example for each 'type' is included in the JSON above. To display a column from your JSON, you must include it in the columns collection. The minimum you can have is the 'column' property. 

    var config = {
        data : data,
        order : 'name', 
        class : 'table',
        export : false,
        itemClick : null,
        itemClickText : null,
        itemsPerPage: 2,
        paging: true,
        columns: [
            { column: 'name', display: 'Name', type: 'text', width: '150px' }, 
            { column: 'age', display: 'Age', type: 'number', width: '80px' },
            { column: 'email', display: 'Email', type: 'email', width: '150px' },
            { column: 'createddate', display: 'Created Date', type: 'date', format: 'dd MMM yyyy', width: '150px' },
            { column: 'website', display: 'Link', type: 'link', width: '150px' }
            ]         
    };

**The Columns Collection** 

This is required. Only columns specified in this collection will be displayed on the grid.

* If you want to sort a column that contains numbers or dates, be sure to add it's type as 'number' or 'date'. 
* You **CANNOT** call your column 'date' as this will break the configuration, sorry.
* Any column can be given a 'width' property to describe it's width in pixels (Percentage not included yet). Although this width is automatically set to the max column size if not specified.

**Exporting to CSV**

By setting the 'export' property to true, the grid will include a button that allows the user to download the content to a CSV file in the browser. 

The default setting is that it exports the same columns as in the view.

**Styling**

Section to be completed...

**Ordering**

By Default, column ordering is turned on, you just need to set the default order when the grid is displayed using the 'order' property.

**Paging**

You can turn paging on or off, but the 'itemsPerPage' will still need to be passed. If you want a single page, set this value to the max size of your data collection.



**Binding Data from HTTP Promises**

You can of course bind data from HTTP promises. I recommend that you first set the 'data' property to and empty array [] then after the config stage has passed and the promise resolved, then bind the data. 

The example [here](https://github.com/iainplimmer/ngGridify/blob/master/samples/GettingDataFromHttp.html) shows this technique in practice. Basically, the watcher on the collection is invoked and circumvents any race conditions. If you have a better way, please let me know ;)  

**Adding a function to a row**

You can add a button to each row that accepts a function, and some text. Let's take the following simple javascript function that just accepts the data from the row. This appears on the far right column.

    function openFunction(val) {
        alert(val.name + ' has been clicked');
    }

We need to add it to our config file like so...

    itemClick : openFunction,
    itemClickText : 'Open',

**Sample Code**

I've managed to put together a few use cases in the samples folder of the [the github repo](https://github.com/iainplimmer/ngGridify)