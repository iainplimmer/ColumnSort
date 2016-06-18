ngGridify is a quick and easy way to show some data on the page, and be able to sort it, configure the columns and bind some sort of javascript function to a button on each line if you want to.

It's built with AngularJS 1.5.x and Bootstrap (although it's not required) and you can knock some data onto a page in seconds before you can say Bingo.

**Installation**

To install ngGridify, you just need to .........

_npm install ng-gridify_

**Required stuff**

Only three scripts are required, and after you have run 'npm install', just make a reference to the following resources in your HTML document.

    <script src="./node_modules/angular/angular.min.js"></script>
    <script src="./node_modules/ng-gridify/ngGridify.js"></script>
    <link href="/node_modules/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

**Using the component**

To use the component itself, you just need to add the reference in your angular module like so.

    angular.module('YourApplication', ['ngGridify'])

Then you can use the component like so.

    <ng-gridify config='config'></ng-gridify>

Notice that the component takes a 'config' object? More about that next

**The Config Object**

The config object contains the data, and any options that you want to apply to the component, such as whether to show paging, how many items appear on a single page, and the columns that are required to be built by the component; including their types.

Let's say that we have this collection of data

    var data = [{
        "website": "http://www.google.com",
        "age": 40,
        "name": "Mclean Roth",
        "email": "mcleanroth@kineticut.com"
    },
    {
        "website": "http://www.google.co.uk",
        "age": 25,
        "name": "Marisa Sexton",
        "email": "marisasexton@kineticut.com"
    },
    {
        "website": "http://www.iainplimmer.co.uk",
        "age": 33,
        "name": "Aline Baird",
        "email": "alinebaird@kineticut.com"
    }];



We can create a config object that we pass to the component, which will show two items per page, with the paging control, a default ordering of the 'name' column. Which is great; we can also 'type' our data and choose a different

** NOTE: If you add items to this data object, they automatically appear on the grid in the current sort order position, and the paging is updated now! **

* **text|number** - shows the value on the page as it appears in the JSON data.
* **email** - creates a 'mailto' link on the data.
* **date** - formats the column as a date, you can pass in an additional format parameter here.
* **link** - you guessed it, creates a link with a new window target. 

Finally, let's put that together in the config object that we would pass. An example for each 'type' is included.

    var config = {
        data : data,
        order : 'name', 
        class : 'table',
        itemClick : null,
        itemClickText : null,
        itemsPerPage: 2,
        paging: true,
        columns: [
            { column: 'name', display: 'Name', type: 'text' }, 
            { column: 'age', display: 'Age', type: 'number' },
            { column: 'email', display: 'Email', type: 'email' },
            { column: 'website', display: 'Link', type: 'link' }
            ]         
    };

** NOTE:** If you want to sort a column that contains numbers or dates, be sure to add it's type as 'number' or 'date'. 
** DATES:** Invalid numbers and dates will be returned as null, this will be hidden in the next version. You CANNOT call your column 'date' as this will break the configuration.
    
**The Columns Configuration**
*Any column can be given a 'width' property to describe it's width in pixels (Percentage not included yet). Although this width is automatically set to the max column size if not specified.
*You must include the name of the column as the 'column' propert, this is the minumum configuration required. If this is the case, the column will be set to the type of 'text' and the header will be the name of the 'column' as per your JSON. 

**Adding a function to a row**

You can add a button to each row that accepts a function, and some text. Let's take the following simple javascript function that just accepts the data from the row.... we also want to set the text on the button to be 'open'.... 

    function openFunction(val) {
        alert(val.name + ' has been clicked');
    }

We need to add it to our config file like so...

    ....
    itemClick : openFunction,
    itemClickText : 'Open',
    ....

**Sample Code**

I've managed to put together some great use cases on the [the github page](https://github.com/iainplimmer/ngGridify)