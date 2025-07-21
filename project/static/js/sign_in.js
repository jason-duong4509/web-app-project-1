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
    const results = request.json(); //Gets the results of the request to the backend
    if (results.success == true){ //Account has been created
        window.location.replace(results.url); //Change the URL to the one provided
    } else{ //Account was not created
        document.getElementById("improper_details_text").hidden = false; //Display error message to user
    }
    //-----------------------------------
});