document.getElementById("sign_up_form").addEventListener("submit", async event =>{
    event.preventDefault();

    //--Check the form's input--
    //TODO: add restrictions on the inputs
    //--------------------------

    //--Submit the form--
    const request = await fetch("/create_account", { //Send request to /create_account
        method: "POST", //Sends a POST request to backend
        body: new FormData(event.target) //Turns the html form into JSON format and send that to backend
    });
    //-------------------

    //--Get the result and interpret it--
    const results = await request.json(); //Gets the results of the request to the backend
    if (results.success == true){ //Account has been created
        window.location.replace(results.url); //Change the URL to the one provided
    } else if (results.success == false){ //Account was not created (user input rejected by backend)
        document.getElementById("improper_details_text").hidden = false; //Display message to user
        document.getElementById("error_text").hidden = true; //Hide error message if present
    } else{ //Account was not created (ran into an error)
        document.getElementById("error_text").hidden = false; //Display error message to user
        document.getElementById("improper_details_text").hidden = true; //Hide message if present
        document.getElementById("error_text").innerHTML = results.success;
    }
    //-----------------------------------
});