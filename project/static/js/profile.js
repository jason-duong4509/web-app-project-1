//--Retreive temporary values passed through HTML--
userID = document.getElementById("userID").textContent; //Retreive the user_id for later
currentUserID = document.getElementById("currentUserID").textContent; //Retreive for later
//-------------------------------------------------

//--Remove the temporary HTML elements--
document.getElementById("userID").remove();
document.getElementById("currentUserID").remove();
//--------------------------------------

//--Check if the user is looking at their own profile--
if (userID != currentUserID){ //User is looking at another user's profile
    document.getElementById("edit_profile_button").hidden = true; //Prevents the user from editing this profile
}
//-----------------------------------------------------

fetch("/p/"+userID+"/get_pfp", {method : "GET"}) //Call fetch send a request to the backend
    .then(responseFromFetch => { //Interpret the response given from the backend and extract any contents given by the backend
        if (responseFromFetch.status === 400){ //Input was rejected by backend
            return responseFromFetch.json(); //Extract the JSON data sent and send it to the next then()
        } else{ //Backend sent the attachment
            return responseFromFetch.blob(); //Extract the binary data of the file that was sent and send it to the next then()
        }
    }).then(dataExtractedFromResponse => { //Take the extracted contents and do something with it
        if (dataExtractedFromResponse.url){ //Checks if the url field exists (if not this is null and is considered falsy in JS)
            window.location.replace(dataExtractedFromResponse.url); //Switch window to 400 error page
        } else{ //dataExtractedFromResponse.url = null. File was sent instead
            const newFileElement = document.createElement("img");
            newFileElement.src = URL.createObjectURL(dataExtractedFromResponse); //Create a URL of the file blob so that the HTML file can render it properly
            newFileElement.id = "profile_picture";
            document.body.appendChild(newFileElement); //Add a new child to form (add the element to the HTML file)
            //----------------------------------------

            //--Style the new element--
            //TODO: this
            //-------------------------
        }
});

fetch("/p/"+userID+"/get_attachment/1", {method : "GET"}) //Call fetch send a request to the backend
    .then(responseFromFetch => { //Interpret the response given from the backend and extract any contents given by the backend
        if (responseFromFetch.status === 400){ //Input was rejected by backend
            return responseFromFetch.json(); //Extract the JSON data sent and send it to the next then()
        } else if (responseFromFetch.status === 404){ //Attachment does not exist response
            //--Insert HTML element that says "No File Attached"--
            const newElement = document.createElement("p");
            newElement.textContent = "No File Attached";
            newElement.id = "attachment_1";
            document.body.appendChild(newElement); //Add a new child to body (add the element to the HTML file)
            //----------------------------------------------------

            //--Style the new element--
            //TODO: this
            //-------------------------
        } else{ //Backend sent the attachment
            return responseFromFetch.blob(); //Extract the binary data of the file that was sent and send it to the next then()
        }
    }).then(dataExtractedFromResponse => { //Take the extracted contents and do something with it
        if (dataExtractedFromResponse != null && dataExtractedFromResponse.url){ //Checks if the url field exists (if not this is null and is considered falsy in JS)
            window.location.replace(dataExtractedFromResponse.url); //Switch window to 400 error page
        } else if (dataExtractedFromResponse != null){ //dataExtractedFromResponse.url = null. File was sent instead
            const newFileElement = document.createElement("iframe");
            newFileElement.src = URL.createObjectURL(dataExtractedFromResponse); //Create a URL of the file blob so that the HTML file can render it properly
            newFileElement.id = "attachment_1";
            document.body.appendChild(newFileElement); //Add a new child to body (add the element to the HTML file)
            //----------------------------------------

            //--Style the new element--
            //TODO: this
            //-------------------------
        }
});

fetch("/p/"+userID+"/get_attachment/2", {method : "GET"}) //Call fetch send a request to the backend
    .then(responseFromFetch => { //Interpret the response given from the backend and extract any contents given by the backend
        if (responseFromFetch.status === 400){ //Input was rejected by backend
            return responseFromFetch.json(); //Extract the JSON data sent and send it to the next then()
        } else if (responseFromFetch.status === 404){ //Attachment does not exist response
            //--Insert HTML element that says "No File Attached"--
            const newElement = document.createElement("p");
            newElement.textContent = "No File Attached";
            newElement.id = "attachment_2";
            document.body.appendChild(newElement); //Add a new child to body (add the element to the HTML file)
            //----------------------------------------------------

            //--Style the new element--
            //TODO: this
            //-------------------------
        } else{ //Backend sent the attachment
            return responseFromFetch.blob(); //Extract the binary data of the file that was sent and send it to the next then()
        }
    }).then(dataExtractedFromResponse => { //Take the extracted contents and do something with it
        if (dataExtractedFromResponse != null && dataExtractedFromResponse.url){ //Checks if the url field exists (if not this is null and is considered falsy in JS)
            window.location.replace(dataExtractedFromResponse.url); //Switch window to 400 error page
        } else if (dataExtractedFromResponse != null){ //dataExtractedFromResponse.url = null. File was sent instead
            const newFileElement = document.createElement("iframe");
            newFileElement.src = URL.createObjectURL(dataExtractedFromResponse); //Create a URL of the file blob so that the HTML file can render it properly
            newFileElement.id = "attachment_2";
            document.body.appendChild(newFileElement); //Add a new child to body (add the element to the HTML file)
            //----------------------------------------

            //--Style the new element--
            //TODO: this
            //-------------------------
        }
});

fetch("/p/"+userID+"/get_attachment/3", {method : "GET"}) //Call fetch send a request to the backend
    .then(responseFromFetch => { //Interpret the response given from the backend and extract any contents given by the backend
        if (responseFromFetch.status === 400){ //Input was rejected by backend
            return responseFromFetch.json(); //Extract the JSON data sent and send it to the next then()
        } else if (responseFromFetch.status === 404){ //Attachment does not exist response
            //--Insert HTML element that says "No File Attached"--
            const newElement = document.createElement("p");
            newElement.textContent = "No File Attached";
            newElement.id = "attachment_3";
            document.body.appendChild(newElement); //Add a new child to body (add the element to the HTML file)
            //----------------------------------------------------

            //--Style the new element--
            //TODO: this
            //-------------------------
        } else{ //Backend sent the attachment
            return responseFromFetch.blob(); //Extract the binary data of the file that was sent and send it to the next then()
        }
    }).then(dataExtractedFromResponse => { //Take the extracted contents and do something with it
        if (dataExtractedFromResponse != null && dataExtractedFromResponse.url){ //Checks if the url field exists (if not this is null and is considered falsy in JS)
            window.location.replace(dataExtractedFromResponse.url); //Switch window to 400 error page
        } else if (dataExtractedFromResponse != null){ //dataExtractedFromResponse.url = null. File was sent instead
            const newFileElement = document.createElement("iframe");
            newFileElement.src = URL.createObjectURL(dataExtractedFromResponse); //Create a URL of the file blob so that the HTML file can render it properly
            newFileElement.id = "attachment_3";
            document.body.appendChild(newFileElement); //Add a new child to body (add the element to the HTML file)
            //----------------------------------------

            //--Style the new element--
            //TODO: this
            //-------------------------
        }
});

//--Functions--
document.getElementById("edit_profile_button").addEventListener("click", event =>{
    event.preventDefault(); //Stops the event (clicking the button) from triggering its default behavior 
    
    //--Switches the buttons around--
    document.getElementById("edit_profile_button").hidden = true; //Makes this button hidden
    document.getElementById("edit_profile_button").disabled = true; //Disables this button (prevents accidental clicks)
    document.getElementById("save_changes").hidden = false; //Makes the save changes button visible
    document.getElementById("save_changes").disabled = false; //Enables the save changes button 
    //-------------------------------

    //--Set up elements that allow for change in profile picture--
    document.getElementById("profile_picture").style.cursor = "pointer"; //Changes the pointer so it looks clickable
    const pfp_input_btn = document.createElement("input");
    pfp_input_btn.type = "file";
    pfp_input_btn.accept = "image/png"; //Window shown to user defaults to pngs only
    pfp_input_btn.id = "pfp_input_btn";
    pfp_input_btn.name = "pfp_input_btn";
    document.body.appendChild(pfp_input_btn);

    //----Style pfp input button----
    //TODO: THIS
    //------------------------------

    //----Add event listener----
    pfp_input_btn.addEventListener("change", async event => {
        const newPFP = pfp_input_btn.files[0]; //Gets the first (of 1) selected file

        const formData = new FormData(); //Creates a FormData object to pass to the backend
        formData.append("newPFP", newPFP); //Adds the new pfp file as a value with key 'newpfp'

        const response = await fetch("/p/"+userID+"/submit_pfp", { //Send response to backend
            method : "POST",
            body : formData
        });

        if (response.status === 400){ //Backend rejected input
            document.getElementById("pfp_error_message").hidden = false;//Display the error message to the user
        } else{ //Backend sent back a file to render
            const fileBlob = await response.blob(); //Get the binary data of the file that was sent 
            const currentPFP = document.getElementById("profile_picture");
            currentPFP.src = URL.createObjectURL(fileBlob); //Create a URL of the fileBlob so that the HTML file can render it properly
            document.getElementById("pfp_error_message").hidden = true;
        }
    });
    //--------------------------
    //------------------------------------------------------------

    //--Set up elements that allow for change in attachment--
    document.getElementById("attachment_1").style.cursor = "pointer"; //Changes the pointer so it looks clickable
    const attach_input_1 = document.createElement("input");
    attach_input_1.type = "file";
    attach_input_1.accept = "application/pdf"; //Window shown to user defaults to PDFs only
    attach_input_1.id = "attach_input_1";
    attach_input_1.name = "attach_input_1";
    document.body.appendChild(attach_input_1);

    //----Style app input button----
    //TODO: THIS
    //------------------------------

    //----Add event listener----
    attach_input_1.addEventListener("change", async event => {
        const newAttach = attach_input_1.files[0]; //Gets the first (of 1) selected file

        const formData = new FormData(); //Creates a FormData object to pass to the backend
        formData.append("newAttach", newAttach); //Adds the new PDF file as a value with key 'newAttach'

        const response = await fetch("/p/"+userID+"/change_attachment/1", { //Send response to backend
            method : "POST",
            body : formData
        });

        if (response.status === 400){ //Backend rejected input
            document.getElementById("attachment_error_message").hidden = false;//Display the error message to the user
        } else{ //Backend sent back a file to render
            const fileBlob = await response.blob(); //Get the binary data of the file that was sent 
            let currentAttach = document.getElementById("attachment_1");

            //--Remove the old attachment and add the new one--
            currentAttach.remove(); //Remove old attachment
            currentAttach = document.createElement("iframe"); //Remake the element to hold the new attachment
            currentAttach.id = "attachment_1";
            document.body.appendChild(currentAttach);
            currentAttach.src = URL.createObjectURL(fileBlob); //Create a URL of the fileBlob so that the HTML file can render it properly
            //-------------------------------------------------

            //--Style the new attachment--
            //todo: this
            //----------------------------
            
            document.getElementById("attachment_error_message").hidden = true; //Hide error message if it isn't already hidden
        }
    });
    //--------------------------
    //-------------------------------------------------------

    //--Set up elements that allow for change in attachment--
    document.getElementById("attachment_2").style.cursor = "pointer"; //Changes the pointer so it looks clickable
    const attach_input_2 = document.createElement("input");
    attach_input_2.type = "file";
    attach_input_2.accept = "application/pdf"; //Window shown to user defaults to PDFs only
    attach_input_2.id = "attach_input_2";
    attach_input_2.name = "attach_input_2";
    document.body.appendChild(attach_input_2);

    //----Style app input button----
    //TODO: THIS
    //------------------------------

    //----Add event listener----
    attach_input_2.addEventListener("change", async event => {
        const newAttach = attach_input_2.files[0]; //Gets the first (of 1) selected file

        const formData = new FormData(); //Creates a FormData object to pass to the backend
        formData.append("newAttach", newAttach); //Adds the new PDF file as a value with key 'newAttach'

        const response = await fetch("/p/"+userID+"/change_attachment/2", { //Send response to backend
            method : "POST",
            body : formData
        });

        if (response.status === 400){ //Backend rejected input
            document.getElementById("attachment_error_message").hidden = false;//Display the error message to the user
        } else{ //Backend sent back a file to render
            const fileBlob = await response.blob(); //Get the binary data of the file that was sent 
            let currentAttach = document.getElementById("attachment_2");

            //--Remove the old attachment and add the new one--
            currentAttach.remove(); //Remove old attachment
            currentAttach = document.createElement("iframe"); //Remake the element to hold the new attachment
            currentAttach.id = "attachment_2";
            document.body.appendChild(currentAttach);
            currentAttach.src = URL.createObjectURL(fileBlob); //Create a URL of the fileBlob so that the HTML file can render it properly
            //-------------------------------------------------

            //--Style the new attachment--
            //todo: this
            //----------------------------
            
            document.getElementById("attachment_error_message").hidden = true; //Hide error message if it isn't already hidden
        }
    });
    //--------------------------
    //-------------------------------------------------------

    //--Set up elements that allow for change in attachment--
    document.getElementById("attachment_3").style.cursor = "pointer"; //Changes the pointer so it looks clickable
    const attach_input_3 = document.createElement("input");
    attach_input_3.type = "file";
    attach_input_3.accept = "application/pdf"; //Window shown to user defaults to PDFs only
    attach_input_3.id = "attach_input_3";
    attach_input_3.name = "attach_input_3";
    document.body.appendChild(attach_input_3);

    //----Style app input button----
    //TODO: THIS
    //------------------------------

    //----Add event listener----
    attach_input_3.addEventListener("change", async event => {
        const newAttach = attach_input_3.files[0]; //Gets the first (of 1) selected file

        const formData = new FormData(); //Creates a FormData object to pass to the backend
        formData.append("newAttach", newAttach); //Adds the new PDF file as a value with key 'newAttach'

        const response = await fetch("/p/"+userID+"/change_attachment/3", { //Send response to backend
            method : "POST",
            body : formData
        });

        if (response.status === 400){ //Backend rejected input
            document.getElementById("attachment_error_message").hidden = false;//Display the error message to the user
        } else{ //Backend sent back a file to render
            const fileBlob = await response.blob(); //Get the binary data of the file that was sent 
            let currentAttach = document.getElementById("attachment_3");

            //--Remove the old attachment and add the new one--
            currentAttach.remove(); //Remove old attachment
            currentAttach = document.createElement("iframe"); //Remake the element to hold the new attachment
            currentAttach.id = "attachment_3";
            document.body.appendChild(currentAttach);
            currentAttach.src = URL.createObjectURL(fileBlob); //Create a URL of the fileBlob so that the HTML file can render it properly
            //-------------------------------------------------

            //--Style the new attachment--
            //todo: this
            //----------------------------
            
            document.getElementById("attachment_error_message").hidden = true; //Hide error message if it isn't already hidden
        }
    });
    //--------------------------
    //-------------------------------------------------------

    //--Enables each profile attribute so that they can be edited--
    document.getElementById("username").disabled = false;
    document.getElementById("username").value = "";
    document.getElementById("fname").disabled = false;
    document.getElementById("fname").value = "";
    document.getElementById("lname").disabled = false;
    document.getElementById("lname").value = "";
    document.getElementById("bio").disabled = false;
    document.getElementById("bio").value = "";
    document.getElementById("password").disabled = false;
    document.getElementById("password").hidden = false;
    document.getElementById("password_label").hidden = false;
    //-------------------------------------------------------------
});

document.getElementById("profile_info").addEventListener("submit", async event =>{//Async to allow for await (wait for a result)
    event.preventDefault(); //Stops the event (clicking the button) from triggering its default behavior (sending the request to the back-end)
    
    //--Validates user input--
    // TODO: do this
    // if all input is same as before, continue but do not run code that sends form
    // if any input is invalid, deny
    //------------------------

    //--Send the form--
    const newProfileInfo = new FormData(event.target); //Convert the form's inputs into a FormData object
    newProfileInfo.append("user_id", userID); //Add the userID of the profile to the form
    const request = await fetch("/p/edit/save", {
        method: "POST",
        body: newProfileInfo
    });
    //-----------------

    //--Retrieve the results--
    const results = await request.json();
    //------------------------

    //--Interpret the results--
    if (results.success == false){ //Form was rejected by backend
        document.getElementById("error_message").hidden = false //Reveals the error message to the user
    } else{//Form was accepted by backend
        //--Switches the buttons around--
        document.getElementById("save_changes").hidden = true; //Makes this button hidden
        document.getElementById("save_changes").disabled = true; //Disables this button (prevents accidental clicks)
        document.getElementById("edit_profile_button").hidden = false; //Makes the edit profile button visible
        document.getElementById("edit_profile_button").disabled = false; //Enables the edit profile button 
        //-------------------------------

        //--Disables each profile attribute so that they cannot be edited--
        document.getElementById("username").disabled = true;
        document.getElementById("fname").disabled = true;
        document.getElementById("lname").disabled = true;
        document.getElementById("bio").disabled = true;
        document.getElementById("password").disabled = true;
        document.getElementById("password").hidden = true;
        document.getElementById("password_label").hidden = true;
        //-----------------------------------------------------------------

        //--Updates each profile attribute to reflect the changes the user made--
        document.getElementById("password").value = ""; //Wipes the password field (prevents being seen later)

        if (document.getElementById("username").value.length == 0){//User did not change the attribute
            document.getElementById("username").value = document.getElementById("username").placeholder; //Restore the attribute 
        } else{ //User did change attribute
            document.getElementById("username").placeholder = document.getElementById("username").value; //Replace the attribute
        }

        if (document.getElementById("fname").value.length == 0){//User did not change the attribute
            document.getElementById("fname").value = document.getElementById("fname").placeholder; //Restore the attribute 
        } else{ //User did change attribute
            document.getElementById("fname").placeholder = document.getElementById("fname").value; //Replace the attribute
        }

        if (document.getElementById("lname").value.length == 0){//User did not change the attribute
            document.getElementById("lname").value = document.getElementById("lname").placeholder; //Restore the attribute 
        } else{ //User did change attribute
            document.getElementById("lname").placeholder = document.getElementById("lname").value; //Replace the attribute
        }

        if (document.getElementById("bio").value.length == 0){//User did not change the attribute
            document.getElementById("bio").value = document.getElementById("bio").placeholder; //Restore the attribute 
        } else{ //User did change attribute
            document.getElementById("bio").placeholder = document.getElementById("bio").value; //Replace the attribute
        }
        //-----------------------------------------------------------------------

        //--Delete input fields for the attachments and profile picture--
        document.getElementById("pfp_input_btn").remove();
        document.getElementById("attach_input_1").remove();
        document.getElementById("attach_input_2").remove();
        document.getElementById("attach_input_3").remove();
        //---------------------------------------------------------------
        
        //--Change the pointers back to normal--
        document.getElementById("profile_picture").style.cursor = "default";
        document.getElementById("attachment_1").style.cursor = "default";
        document.getElementById("attachment_2").style.cursor = "default";
        document.getElementById("attachment_3").style.cursor = "default";
        //--------------------------------------

        //--Hide the error messages--
        document.getElementById("error_message").hidden = true;
        document.getElementById("pfp_error_message").hidden = true;
        document.getElementById("attachment_error_message").hidden = true;
        //---------------------------
    }
    //-------------------------
});
//-------------