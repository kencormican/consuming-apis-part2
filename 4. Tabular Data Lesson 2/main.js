const baseURL = "https://ci-swapi.herokuapp.com/api/";	    // URL declared as constance for use in  xhr.open() method

function getData(type, cb) {			                    // getData function defines with cb & api type passed in as arguments
    var xhr = new XMLHttpRequest();			                // New javaScript xhr object instance that faciliates consumption of APIs
    xhr.open("GET", baseURL + type + "/");		            // open connection with URL we want to retrieve from server
    xhr.send();				                                // send request

    xhr.onreadystatechange = function() {		            // Event Listener checking for change in internal state of xhr object
        if (this.readyState == 4 && this.status == 200) {	// If opereation is complete (4) and has succeeded (200) do the following
            cb(JSON.parse(this.responseText));		        // JSON parsed responseText passed into cb function as argument
        }
    };
}


function getTableHeaders(obj) {
    var tableHeaders = [];

    Object.keys(obj).forEach(function(key) {                //iterate over each obj, retrieve the key and insert it into a table cell
        tableHeaders.push(`<td>${key}</td>`)
    });
    return `<tr>${tableHeaders}</tr>`;                      // insert tableHeaders array into row
}


function writeToDocument(type) {

    var el = document.getElementById("data");               // overwrite innerHTML of element with blank string everytime it is clicked                   
    el.innerHTML = "";		

    getData(type, function(data) {	
    var tableRows =[];                                      // Initialise empty tableRows Array                
    data = data.results;                                    // overwrite data variable with data.results (from console.dir query)
    var tableHeaders = getTableHeaders(data[0]);            // Store contents of first index in tableHeaders array
    
    data.forEach(function(item) {  
        var dataRow = [];                                   
        tableRows.push(dataRow);                            // push dataRow into tableRows array

        Object.keys(item).forEach(function(key){            // iterate over each item      
         dataRow.push(`<td>${item[key]}</td>`);             // push value into cell of dataRows  
        });        
    });

    el.innerHTML = `<table>${tableHeaders}${tableRows}</table>`;       // Insert tableHeaders & tableRows arrays using template literals
    });
}



