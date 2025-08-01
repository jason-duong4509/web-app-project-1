document.getElementById("options").addEventListener("change", async event =>{//Change event -> when an option is selected
    if (event.target.value === "log_out"){ //Log out option was chosen
        const request = await fetch("/logout", {method : "POST"}); //Call backend to log the user out
    
        //--Get the result and interpret it--
        const results = await request.json(); //Gets the results of the request to the backend
        window.location.replace(results.url); //Change the URL to the one provided
        //-----------------------------------
    } else if (event.target.value === "profile"){//View profile option was chosen
        const request = await fetch("/p/own", {method : "GET"}); //Call backend to display the user's own profile

        //--Get the result and interpret it--
        const results = await request.json(); //Gets the results of the request to the backend
        window.location.replace(results.url); //Change the URL to the one provided
        //-----------------------------------
    }
});

document.getElementById("search_bar").addEventListener("keypress", async event => {
    if (event.key === "Enter"){ //Checks that the key pressed is Enter. === means equal in value and type (will not accept strings "Enter")
        event.preventDefault();
        //--Input checking--
        let regex = /^[a-zA-Z0-9]+$/; //Define an alphanumeric regex
        const invalidSearchLength = document.getElementById("search_bar").value.length > 20 || document.getElementById("search_bar").value.length < 5;
        const invalidSearchFormat = !(regex.test(document.getElementById("search_bar").value)); //Returns true if the username matches the regular expression, then negated and stored in the variable

        if (invalidSearchLength || invalidSearchFormat){ //Form failed front-end checks
            document.getElementById("error_message").hidden = false; //Display message to user
        //------------------
        } else{
            const request = await fetch("/search/" + userInput, {method: "GET"});

            //--Interpret the results--
            const results = await request.json();

            if (results.success === true){//Found a user that matched the search request
                window.location.replace(results.url); //Switch the url to the one provided
            } else{//Did not find a user that matched the search results
                document.getElementById("error_message").hidden = false; //Presents user with an error message
            }
            //-------------------------
        }
    }
});