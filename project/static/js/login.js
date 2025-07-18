document.getElementById("login_form").addEventListener("submit", async event =>{
    event.preventDefault(); //Stops form from being submitted normally

    //--Check the input--
    const passwordInput = document.getElementById("password").innerHTML;
    const usernameInput = document.getElementById("username").innerHTML;
    if (usernameInput.length > 30 || usernameInput.length <= 0 || passwordInput.length > 200 || passwordInput.length <= 0) { //Password/username is unreasonably long/short
        document.getElementById("incorrect_login_details_text").hidden = false; //Pretend that the password is wrong
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
        if (results.success == false){//The user login info was incorrect
            document.getElementById("incorrect_login_details_text").hidden = false;
        } else{ //An error occurred during login and the user is not logged in
            document.getElementById("error_text").hidden = false;
        }
        //---------------------------------
    }    
});
