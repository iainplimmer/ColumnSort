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
        "id": "fa7513d9-0979-491f-888e-83415ecbff9e",
        "website": "http://www.google.com",
        "age": 40,
        "name": "Mclean Roth",
        "gender": "male",
        "email": "mcleanroth@kineticut.com",
        "phone": "+1 (807) 421-3548"
    },
    {
        "id": "dba1223a-1b26-459e-a5ed-13249fdcb2f3",
        "website": "http://www.google.co.uk",
        "age": 25,
        "name": "Marisa Sexton",
        "gender": "female",
        "email": "marisasexton@kineticut.com",
        "phone": "+1 (875) 579-3311"
    },
    {
        "id": "49038024-5e57-4ec8-91ca-fd97facd9182",
        "website": "http://www.google.es",
        "age": 28,
        "name": "Young Stanton",
        "gender": "female",
        "email": "youngstanton@kineticut.com",
        "phone": "+1 (912) 584-3663"
    },
    {
        "id": "d097362a-5e19-4403-b596-8c9888520d82",
        "website": "http://www.iainplimmer.co.uk",
        "age": 33,
        "name": "Aline Baird",
        "gender": "female",
        "email": "alinebaird@kineticut.com",
        "phone": "+1 (857) 479-2690"
    }];



We can create a config object that we pass to the component, which will show two items per page, with the paging control, a default ordering of the 'name' column. Which is great; we can also 'type' our data and choose a different

** NOTE: If you add items to this data object, they automatically appear on the grid in the current sort order position, and the paging is updated now! **

* **text|number** - shows the value on the page as it appears in the JSON data.
* **email** - creates a 'mailto' link on the data.
* **link** - you guessed it, creates a link with a new window target. 

Finally, let's put that together in the config object that we would pass.....

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
            { column: 'gender', display: 'Gender', type: 'text' },
            { column: 'email', display: 'Email', type: 'email' },
            { column: 'website', display: 'Link', type: 'link' }
            ]         
    };

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