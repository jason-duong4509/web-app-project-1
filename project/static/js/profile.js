//--Retreive temporary values passed through HTML--
const userID = document.getElementById("userID").textContent; //Retreive the user_id for later
const currentUserID = document.getElementById("currentUserID").textContent; //Retreive for later
const attachment1Filename = document.getElementById("attachment1Filename").textContent; //Retreive for later
const attachment2Filename = document.getElementById("attachment2Filename").textContent; //Retreive for later
const attachment3Filename = document.getElementById("attachment3Filename").textContent; //Retreive for later
//-------------------------------------------------

//--Remove the temporary HTML elements--
document.getElementById("userID").remove();
document.getElementById("currentUserID").remove();
document.getElementById("attachment1Filename").remove();
document.getElementById("attachment2Filename").remove();
document.getElementById("attachment3Filename").remove();
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
        }
});

fetch("/p/"+userID+"/get_attachment/1/0", {method : "GET"}) //Call fetch send a request to the backend
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
        } else{ //Backend sent the attachment
            return responseFromFetch.blob(); //Extract the binary data of the file that was sent and send it to the next then()
        }
    }).then(dataExtractedFromResponse => { //Take the extracted contents and do something with it
        if (dataExtractedFromResponse != null && dataExtractedFromResponse.url){ //Checks if the url field exists (if not this is null and is considered falsy in JS)
            window.location.replace(dataExtractedFromResponse.url); //Switch window to 400 error page
        } else if (dataExtractedFromResponse != null){ //dataExtractedFromResponse.url = null. File was sent instead
            const newFileElement = document.createElement("a");
            newFileElement.href = URL.createObjectURL(dataExtractedFromResponse); //Create a URL of the file blob so that the HTML file can render it properly
            newFileElement.id = "attachment_1";
            newFileElement.target = "_blank"; //Opens a new window on click
            newFileElement.textContent = attachment1Filename;
            document.body.appendChild(newFileElement); //Add a new child to body (add the element to the HTML file)
            //----------------------------------------
        }
});

fetch("/p/"+userID+"/get_attachment/2/0", {method : "GET"}) //Call fetch send a request to the backend
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
        } else{ //Backend sent the attachment
            return responseFromFetch.blob(); //Extract the binary data of the file that was sent and send it to the next then()
        }
    }).then(dataExtractedFromResponse => { //Take the extracted contents and do something with it
        if (dataExtractedFromResponse != null && dataExtractedFromResponse.url){ //Checks if the url field exists (if not this is null and is considered falsy in JS)
            window.location.replace(dataExtractedFromResponse.url); //Switch window to 400 error page
        } else if (dataExtractedFromResponse != null){ //dataExtractedFromResponse.url = null. File was sent instead
            const newFileElement = document.createElement("a");
            newFileElement.href = URL.createObjectURL(dataExtractedFromResponse); //Create a URL of the file blob so that the HTML file can render it properly
            newFileElement.id = "attachment_2";
            newFileElement.target = "_blank";
            newFileElement.textContent = attachment2Filename;
            document.body.appendChild(newFileElement); //Add a new child to body (add the element to the HTML file)
            //----------------------------------------
        }
});

fetch("/p/"+userID+"/get_attachment/3/0", {method : "GET"}) //Call fetch send a request to the backend
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
        } else{ //Backend sent the attachment
            return responseFromFetch.blob(); //Extract the binary data of the file that was sent and send it to the next then()
        }
    }).then(dataExtractedFromResponse => { //Take the extracted contents and do something with it
        if (dataExtractedFromResponse != null && dataExtractedFromResponse.url){ //Checks if the url field exists (if not this is null and is considered falsy in JS)
            window.location.replace(dataExtractedFromResponse.url); //Switch window to 400 error page
        } else if (dataExtractedFromResponse != null){ //dataExtractedFromResponse.url = null. File was sent instead
            const newFileElement = document.createElement("a");
            newFileElement.href = URL.createObjectURL(dataExtractedFromResponse); //Create a URL of the file blob so that the HTML file can render it properly
            newFileElement.id = "attachment_3";
            newFileElement.target = "_blank";
            newFileElement.textContent = attachment3Filename;
            document.body.appendChild(newFileElement); //Add a new child to body (add the element to the HTML file)
            //----------------------------------------
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
    document.getElementById("profile_picture").style.opacity= 0.5; //Changes the pointer so it looks changable
    const pfp_input_btn = document.createElement("input");
    pfp_input_btn.type = "file";
    pfp_input_btn.accept = "image/png"; //Window shown to user defaults to pngs only
    pfp_input_btn.id = "pfp_input_btn";
    pfp_input_btn.name = "pfp_input_btn";
    document.body.appendChild(pfp_input_btn);

    //----Add event listener----
    pfp_input_btn.addEventListener("change", async event => {
        const newPFP = pfp_input_btn.files[0]; //Gets the first (of 1) selected file

        if (newPFP){//File exists
            //--Input checks--
            const fileMIMEType = newPFP.type; //Get the MIME type of the file
            const fileSize = newPFP.size; // Get the size of the file in bytes

            const wrongFileType = fileMIMEType === "image/png";
            const fileTooLarge = fileSize > 16000000; // checks if the file size is greater than 16MB

            if (wrongFileType){//User input failed front-end check
                document.getElementById("pfp_error_message").hidden = false;
                document.getElementById("pfp_too_large").hidden = true;
            } else if (fileTooLarge){ //User input failed front-end check
                document.getElementById("pfp_too_large").hidden = false;
                document.getElementById("pfp_error_message").hidden = true;
            //----------------
            } else{//User input passed front-end check
                const formData = new FormData(); //Creates a FormData object to pass to the backend
                formData.append("newPFP", newPFP); //Adds the new pfp file as a value with key 'newpfp'

                const response = await fetch("/p/"+userID+"/submit_pfp", { //Send response to backend
                    method : "POST",
                    body : formData
                });

                if (response.status === 400){ //Backend rejected input
                    document.getElementById("pfp_error_message").hidden = false;//Display the error message to the user
                    document.getElementById("pfp_too_large").hidden = true;//Display to user
                } else if (response.status === 413){ //Input is too large
                    document.getElementById("pfp_too_large").hidden = false;//Display to user
                    document.getElementById("pfp_error_message").hidden = true;//Display to user
                } else{ //Backend sent back a file to render
                    const fileBlob = await response.blob(); //Get the binary data of the file that was sent 
                    const currentPFP = document.getElementById("profile_picture");
                    currentPFP.src = URL.createObjectURL(fileBlob); //Create a URL of the fileBlob so that the HTML file can render it properly
                    document.getElementById("pfp_error_message").hidden = true;
                    document.getElementById("pfp_too_large").hidden = true;
                }
            }
        }
    });
    //--------------------------
    //------------------------------------------------------------

    //--Set up elements that allow for change in attachment--
    document.getElementById("attachment_1").style.opacity = 0.5; //Changes the pointer so it looks changable
    const attach_input_1 = document.createElement("input");
    attach_input_1.type = "file";
    attach_input_1.accept = "application/pdf"; //Window shown to user defaults to PDFs only
    attach_input_1.id = "attach_input_1";
    attach_input_1.name = "attach_input_1";
    document.body.appendChild(attach_input_1);

    //----Add event listener----
    attach_input_1.addEventListener("change", async event => {
        const newAttach = attach_input_1.files[0]; //Gets the first (of 1) selected file

        if (newAttach){//File exists
            //--Input checks--
            const fileMIMEType = newAttach.type; //Get the MIME type of the file
            const fileSize = newAttach.size; // Get the size of the file in bytes

            const wrongFileType = fileMIMEType === "application/pdf";
            const fileTooLarge = fileSize > 16000000; // checks if the file size is greater than 16MB

            if (wrongFileType){//User input failed front-end check
                document.getElementById("attachment_error_message").hidden = false;
                document.getElementById("attachment_too_large").hidden = true;
            } else if (fileTooLarge){ //User input failed front-end check
                document.getElementById("attachment_too_large").hidden = false;
                document.getElementById("attachment_error_message").hidden = true;
            //----------------
            } else{//User input passed front-end check
                const formData = new FormData(); //Creates a FormData object to pass to the backend
                formData.append("newAttach", newAttach); //Adds the new PDF file as a value with key 'newAttach'

                const response = await fetch("/p/"+userID+"/change_attachment/1", { //Send response to backend
                    method : "POST",
                    body : formData
                });

                if (response.status === 400){ //Backend rejected input
                    document.getElementById("attachment_error_message").hidden = false;//Display the error message to the user
                    document.getElementById("attachment_too_large").hidden = true;
                } else if (response.status === 413){ //Input is too large
                    document.getElementById("attachment_too_large").hidden = false;
                    document.getElementById("attachment_error_message").hidden = true;
                } else{ //Backend sent back a file to render
                    const fileBlob = await response.blob(); //Get the binary data of the file that was sent 
                    let currentAttach = document.getElementById("attachment_1");

                    //--Call the backend to get the file name--
                    const fileNameRequest = await fetch("/p/"+userID+"/get_attachment/1/1", {method: "GET"});
                    const fileNameResponse = await fileNameRequest.json();

                    if (!fileNameResponse.fileName){ //Does not exist -> URL was tampered by front-end and error was thrown
                        window.location.replace(fileNameResponse.url); //Redirect to error page
                    }
                    //-----------------------------------------

                    //--Remove the old attachment and add the new one--
                    currentAttach.remove(); //Remove old attachment
                    currentAttach = document.createElement("a"); //Remake the element to hold the new attachment
                    currentAttach.id = "attachment_1";
                    document.body.appendChild(currentAttach);
                    currentAttach.href = URL.createObjectURL(fileBlob); //Create a URL of the fileBlob so that the HTML file can render it properly
                    currentAttach.target = "_blank";
                    currentAttach.textContent = fileNameResponse.fileName;
                    //-------------------------------------------------
                    
                    document.getElementById("attachment_error_message").hidden = true; //Hide error message if it isn't already hidden
                    document.getElementById("attachment_too_large").hidden = true;
                }
            }
        }
    });
    //--------------------------
    //-------------------------------------------------------

    //--Set up elements that allow for change in attachment--
    document.getElementById("attachment_2").style.opacity = 0.5; //Changes the pointer so it looks changable
    const attach_input_2 = document.createElement("input");
    attach_input_2.type = "file";
    attach_input_2.accept = "application/pdf"; //Window shown to user defaults to PDFs only
    attach_input_2.id = "attach_input_2";
    attach_input_2.name = "attach_input_2";
    document.body.appendChild(attach_input_2);

    //----Add event listener----
    attach_input_2.addEventListener("change", async event => {
        const newAttach = attach_input_2.files[0]; //Gets the first (of 1) selected file

        if (newAttach){//File exists
            //--Input checks--
            const fileMIMEType = newAttach.type; //Get the MIME type of the file
            const fileSize = newAttach.size; // Get the size of the file in bytes

            const wrongFileType = fileMIMEType === "application/pdf";
            const fileTooLarge = fileSize > 16000000; // checks if the file size is greater than 16MB

            if (wrongFileType){//User input failed front-end check
                document.getElementById("attachment_error_message").hidden = false;
                document.getElementById("attachment_too_large").hidden = true;
            } else if (fileTooLarge){ //User input failed front-end check
                document.getElementById("attachment_too_large").hidden = false;
                document.getElementById("attachment_error_message").hidden = true;
            //----------------
            } else{//User input passed front-end check
                const formData = new FormData(); //Creates a FormData object to pass to the backend
                formData.append("newAttach", newAttach); //Adds the new PDF file as a value with key 'newAttach'

                const response = await fetch("/p/"+userID+"/change_attachment/2", { //Send response to backend
                    method : "POST",
                    body : formData
                });

                if (response.status === 400){ //Backend rejected input
                    document.getElementById("attachment_error_message").hidden = false;//Display the error message to the user
                    document.getElementById("attachment_too_large").hidden = true;
                } else if(response.status === 413){ //Input is too large
                    document.getElementById("attachment_too_large").hidden = false;
                    document.getElementById("attachment_error_message").hidden = true;
                } else{ //Backend sent back a file to render
                    const fileBlob = await response.blob(); //Get the binary data of the file that was sent 
                    let currentAttach = document.getElementById("attachment_2");

                    //--Call the backend to get the file name--
                    const fileNameRequest = await fetch("/p/"+userID+"/get_attachment/2/1", {method: "GET"});
                    const fileNameResponse = await fileNameRequest.json();

                    if (!fileNameResponse.fileName){ //Does not exist -> URL was tampered by front-end and error was thrown
                        window.location.replace(fileNameResponse.url); //Redirect to error page
                    }
                    //-----------------------------------------

                    //--Remove the old attachment and add the new one--
                    currentAttach.remove(); //Remove old attachment
                    currentAttach = document.createElement("a"); //Remake the element to hold the new attachment
                    currentAttach.id = "attachment_2";
                    document.body.appendChild(currentAttach);
                    currentAttach.href = URL.createObjectURL(fileBlob); //Create a URL of the fileBlob so that the HTML file can render it properly
                    currentAttach.target="_blank";
                    currentAttach.textContent = fileNameResponse.fileName;
                    //-------------------------------------------------
                    
                    document.getElementById("attachment_error_message").hidden = true; //Hide error message if it isn't already hidden
                    document.getElementById("attachment_too_large").hidden = true;
                }
            }
        }
    });
    //--------------------------
    //-------------------------------------------------------

    //--Set up elements that allow for change in attachment--
    document.getElementById("attachment_3").style.opacity = 0.5; //Changes the pointer so it looks changable
    const attach_input_3 = document.createElement("input");
    attach_input_3.type = "file";
    attach_input_3.accept = "application/pdf"; //Window shown to user defaults to PDFs only
    attach_input_3.id = "attach_input_3";
    attach_input_3.name = "attach_input_3";
    document.body.appendChild(attach_input_3);

    //----Add event listener----
    attach_input_3.addEventListener("change", async event => {
        const newAttach = attach_input_3.files[0]; //Gets the first (of 1) selected file

        if (newAttach){//File exists
            //--Input checks--
            const fileMIMEType = newAttach.type; //Get the MIME type of the file
            const fileSize = newAttach.size; // Get the size of the file in bytes

            const wrongFileType = fileMIMEType === "application/pdf";
            const fileTooLarge = fileSize > 16000000; // checks if the file size is greater than 16MB

            if (wrongFileType){//User input failed front-end check
                document.getElementById("attachment_error_message").hidden = false;
                document.getElementById("attachment_too_large").hidden = true;
            } else if (fileTooLarge){ //User input failed front-end check
                document.getElementById("attachment_too_large").hidden = false;
                document.getElementById("attachment_error_message").hidden = true;
            //----------------
            } else{//User input passed front-end check
                const formData = new FormData(); //Creates a FormData object to pass to the backend
                formData.append("newAttach", newAttach); //Adds the new PDF file as a value with key 'newAttach'

                const response = await fetch("/p/"+userID+"/change_attachment/3", { //Send response to backend
                    method : "POST",
                    body : formData
                });

                if (response.status === 400){ //Backend rejected input
                    document.getElementById("attachment_error_message").hidden = false;//Display the error message to the user
                    document.getElementById("attachment_too_large").hidden = true;
                } else if(response.status == 413){ //Input is too large
                    document.getElementById("attachment_too_large").hidden = false;
                    document.getElementById("attachment_error_message").hidden = true;
                } else{ //Backend sent back a file to render
                    const fileBlob = await response.blob(); //Get the binary data of the file that was sent 
                    let currentAttach = document.getElementById("attachment_3");

                    //--Call the backend to get the file name--
                    const fileNameRequest = await fetch("/p/"+userID+"/get_attachment/3/1", {method: "GET"});
                    const fileNameResponse = await fileNameRequest.json();

                    if (!fileNameResponse.fileName){ //Does not exist -> URL was tampered by front-end and error was thrown
                        window.location.replace(fileNameResponse.url); //Redirect to error page
                    }
                    //-----------------------------------------

                    //--Remove the old attachment and add the new one--
                    currentAttach.remove(); //Remove old attachment
                    currentAttach = document.createElement("a"); //Remake the element to hold the new attachment
                    currentAttach.id = "attachment_3";
                    document.body.appendChild(currentAttach);
                    currentAttach.href = URL.createObjectURL(fileBlob); //Create a URL of the fileBlob so that the HTML file can render it properly
                    currentAttach.target = "_blank";
                    currentAttach.textContent = fileNameResponse.fileName;
                    //-------------------------------------------------
                    
                    document.getElementById("attachment_error_message").hidden = true; //Hide error message if it isn't already hidden
                    document.getElementById("attachment_too_large").hidden = true;
                }
            }
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

    //--Enable delete account button--
    document.getElementById("delete_button").disabled = false;
    document.getElementById("delete_button").hidden = false;
    //--------------------------------
});

document.getElementById("profile_info").addEventListener("submit", async event =>{//Async to allow for await (wait for a result)
    event.preventDefault(); //Stops the event (clicking the button) from triggering its default behavior (sending the request to the back-end)
    
    //--Validates user input--
    let regex = /^[a-zA-Z0-9]*$/; //Define an alphanumeric regex
    const invalidUsernameLength = (document.getElementById("username").value.length > 20 || document.getElementById("username").value.length < 5) && document.getElementById("username").value.length != 0;
    const invalidUsernameFormat = !(regex.test(document.getElementById("username").value)); //Returns true if the username matches the regular expression, then negated and stored in the variable

    regex = /^[a-zA-Z]*$/; //Define a regex that contains the English alphabet
    const invalidFnameLength = document.getElementById("fname").value.length < 0;
    const invalidLnameLength = document.getElementById("lname").value.length < 0;
    const invalidFnameFormat = !(regex.test(document.getElementById("fname").value));
    const invalidLnameFormat = !(regex.test(document.getElementById("lname").value));

    const passwordTooShort = document.getElementById("password").value.length < 6 && document.getElementById("password").value.length != 0;

    const bioTooLong = document.getElementById("bio").value.length > 300

    if (invalidUsernameLength || invalidUsernameFormat || invalidFnameFormat || invalidFnameLength || invalidLnameLength || invalidLnameFormat || passwordTooShort || bioTooLong){ //Form failed front-end checks
        document.getElementById("error_message").hidden = false; //Display message to user
        document.getElementById("something_went_wrong_message").hidden = true; //Hide error message if present
    //------------------------
    } else{ //User input accepted by front-end
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
        if (results.success === false){ //Form was rejected by backend
            document.getElementById("error_message").hidden = false; //Reveals the error message to the user
            document.getElementById("something_went_wrong_message").hidden = true; //Hide error message if present
        } else if (results.success === true){//Form was accepted by backend
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
            
            //--Change the attachments/profile picture back to normal--
            document.getElementById("profile_picture").style.opacity = 1;
            document.getElementById("attachment_1").style.opacity = 1;
            document.getElementById("attachment_2").style.opacity = 1;
            document.getElementById("attachment_3").style.opacity = 1;
            //---------------------------------------------------------

            //--Hide the error messages--
            document.getElementById("error_message").hidden = true;
            document.getElementById("pfp_error_message").hidden = true;
            document.getElementById("attachment_error_message").hidden = true;
            document.getElementById("something_went_wrong_message").hidden = true;
            //---------------------------

            //--Disable delete account button--
            document.getElementById("delete_button").disabled = true;
            document.getElementById("delete_button").hidden = true;
            //---------------------------------
        } else{ //An error occurred in the backend
            document.getElementById("something_went_wrong_message").hidden = false; //Reveals the error message to the user
            document.getElementById("error_message").hidden = true; //Hides the error message from the user if shown
        }
        //-------------------------
    }
});
//-------------