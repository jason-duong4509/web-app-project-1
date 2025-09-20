userID = document.getElementById("user_id").innerHTML; //Get the stored user_id
document.getElementById("user_id").remove(); //Delete the element after grabbing the user_id

document.getElementById("user_details_form").addEventListener("submit", async event => {
    event.preventDefault();

    //--Input checks--
    let regex = /^[a-zA-Z0-9]+$/; //Define an alphanumeric regex
    const invalidUsernameLength = document.getElementById("username").value.length > 20 || document.getElementById("username").value.length < 5;
    const invalidUsernameFormat = !(regex.test(document.getElementById("username").value)); //Returns true if the username matches the regular expression, then negated and stored in the variable

    const passwordTooShort = document.getElementById("password").value < 6;

    if (invalidUsernameFormat || invalidUsernameLength || passwordTooShort){//User input failed front-end check
        document.getElementById("error_message").hidden = false; //Show the error message to the user
    //----------------
    } else{ //User input passed front-end check
        const request = await fetch("/p/"+userID+"/confirm_delete_account", {
            method : "POST",
            body : new FormData(event.target) //Grab the user's inputs and turn it into a FormData object to send to the backend
        });

        const response = await request.json(); //Get the JSON result

        if (response.success == true){//Account has been deleted
            window.location.replace(response.url);//Bring the user to the sign up screen
        } else if (response.success == false){//Back-end rejected input
            document.getElementById("error_message").hidden = false; //Show the error message to the user
        } else{//Back-end encountered illegal user input
            window.location.replace(response.url);//bring the user to the 400 error page
        }
    }
});