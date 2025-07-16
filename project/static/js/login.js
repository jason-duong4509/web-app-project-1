//TODO: JS is needed to intercept and submit the login form on behalf of the html file. if successful, display a new html (home page).
// if not, dynamically change the html file to show that login failed
// each form submit goes to /loginSubmit for validation
// make sure to add some code that sanitizes input before giving it to the backend (where itll presumable also sanitize input)

document.getElementById("login_form").addEventListener("submit", async event =>{
    event.preventDefault(); //Stops form from being submitted normally

    //--Check the input--
    //TODO: do this
    //-------------------

    //--Send form to back-end--
    const request = await fetch("/loginSubmit", { //Send a request to /loginSubmit in lieu of login.html. Wait until it's done sending
        method: "POST", //Send a POST request to the backend
        body: new FormData(event.target) //Take the form (event.target) and convert it into key-value pairs (via FormData) and send the result to the backend
    });
    //-------------------------

    //--Get and interpret the results--
    const results = await request.json(); //Gets the result of the request (will be in JSON format). Wait until it gets a result before proceeding
    if (results.success == true){ //The user's login information is correct and the user is logged in
        //TODO: insert homepage html to send to the user
    } else if (results.success == false){//The user login info was incorrect
        document.getElementById("incorrect_login_details_text").hidden = false;
    } else if (results.success == null){ //An error occurred during login and the user is not logged in
        document.getElementById("error_text").hidden = false;
    }
    //---------------------------------
});
