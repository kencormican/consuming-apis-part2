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
function writeToDocument(type) {
    var el = document.getElementById("data");   // overwrite innerHTML of element with blank string everytime it is clicked                   
    el.innerHTML = "";		

    getData(type, function(data) {			                
    data = data.results;                         // overwrite data variable with data.results (from console.dir query)
    
    data.forEach(function(item){                 // forEach array object iterate over array & retrieve the name property
        el.innerHTML += `<p> ${item.name} </p>`; // seperate items within <p> elements using template literals
        });
    });
}

