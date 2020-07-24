function getData(url, cb) {			                        // getData function defines with cb & api type passed in as arguments
    var xhr = new XMLHttpRequest();			                // New javaScript xhr object instance that faciliates consumption of APIs
    xhr.open("GET", url);		                            // open connection with URL we want to retrieve from server
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

function generatePaginationButtons(next, prev) {
// if next & prev returned create 2x buttons
    if (next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>
                <button onclick="writeToDocument('${next}')">Next</button>`;
// if only next returned create 1x next button
    } else if (next && !prev) {
        return `<button onclick="writeToDocument('${next}')">Next</button>`;
// if only prev returned create 1x pervious button
    } else if (!next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>`;
    }
}


function writeToDocument(url) {

    var el = document.getElementById("data");               // overwrite innerHTML of element with blank string everytime it is clicked                   
    el.innerHTML = "";		

    getData(url, function(data) {	
        // Create pagination variable to store output of GenPagButton function
        var pagination;                                   

        // If there are next or previous URLs run GenPagButton function and store o/p on pagination variable
        if (data.next || data.previous) {			
                pagination = generatePaginationButtons(data.next, data.previous);
            }

        var tableRows =[];                                      // Initialise empty tableRows Array                
        data = data.results;                                    // overwrite data variable with data.results (from console.dir query)
        var tableHeaders = getTableHeaders(data[0]);            // Store contents of first index in tableHeaders array
        



        data.forEach(function(item) {  
            var dataRow = [];                                   

            Object.keys(item).forEach(function(key){            // iterate over each item      
            var rowData = item[key].toString();                // push array element into string
            var truncatedData = rowData.substring(0,15);       // shorten string to 15 characters
            dataRow.push(`<td>${truncatedData}</td>`);         // push the truncated string into cell of dataRows  
            });  

            tableRows.push(`<tr>${dataRow}</tr>`);              // push dataRow into tableRows array      
        });

        // Insert contents of tableHeaders & tableRows arrays, &  pagination buttons using template literals
        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`;       
    });
}



