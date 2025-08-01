document.getElementById("login_form").addEventListener("submit", async event =>{
    event.preventDefault(); //Stops form from being submitted normally

    //--Check the input--
    let regex = /^[a-zA-Z0-9]+$/; //Define an alphanumeric regex
    const invalidUsernameLength = document.getElementById("username").value.length > 20 || document.getElementById("username").value.length < 5;
    const invalidUsernameFormat = !(regex.test(document.getElementById("username").value)); //Returns true if the username matches the regular expression, then negated and stored in the variable

    const passwordTooShort = document.getElementById("password").value < 6;

    if (invalidUsernameLength || invalidUsernameFormat || passwordTooShort){ //Form failed front-end checks
        document.getElementById("incorrect_login_details_text").hidden = false; //Display message to user
        document.getElementById("error_text").hidden = true; //Hide error message if present
    //-------------------
    } else{
        //--Send form to back-end--
        const request = await fetch("/loginSubmit", { //Send a request to /loginSubmit in lieu of login.html. Wait until it's done sending
            method: "POST", //Send a POST request to the backend
            body: new FormData(event.target) //Take the form (event.target) and convert it into key-value pairs (via FormData) and send the result to the backend
        });
        //-------------------------

        //--Get and interpret the results--
        const results = await request.json(); //Gets the result of the request (will be in JSON format). Wait until it gets a result before proceeding
        if (results.success === false){//The user's login info was incorrect
            document.getElementById("incorrect_login_details_text").hidden = false;
            document.getElementById("error_text").hidden = true;
        } else if (results.success === true){ //The user's login info was correct
            window.location.replace(results.url); //Change the URL to the one provided
        } else{ //An error occurred during login and the user is not logged in
            document.getElementById("error_text").hidden = false;
            document.getElementById("incorrect_login_details_text").hidden = true;
        }
        //---------------------------------
    }    
});
