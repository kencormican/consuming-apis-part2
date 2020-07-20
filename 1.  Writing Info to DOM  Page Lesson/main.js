const baseURL = "https://ci-swapi.herokuapp.com/api/";	// URL declared as constance for use in  xhr.open() method

function getData(type, cb) {			                // getData function defines with cb & api type passed in as arguments
    var xhr = new XMLHttpRequest();			            // New javaScript xhr object instance that faciliates consumption of APIs
    xhr.open("GET", baseURL + type + "/");		        // open connection with URL we want to retrieve from server
    xhr.send();				                            // send request

    xhr.onreadystatechange = function() {		            // Event Listener checking for change in internal state of xhr object
        if (this.readyState == 4 && this.status == 200) {	// If opereation is complete (4) and has succeeded (200) do the following
            cb(JSON.parse(this.responseText));		        // JSON parsed responseText passed into cb function as argument
        }
    };
}
function writeToDocument(type) {			                // Create writeToDOM function passing in type retrieved from API request
    getData(type, function(data) {			                // Call GetData function and take in type and innerHTML function as arguements
        document.getElementById("data").innerHTML = data;	//  Get div with data id and set innerHTML to info/data  passed in from cb callback function
    });
}
