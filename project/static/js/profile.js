"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _profileReact = require("./profile-react");

var _profileReact2 = _interopRequireDefault(_profileReact);

//Import the react file

var _reactDomClient = require('react-dom/client');

//Import createRoot so that react can attach itself onto the desired HTML element

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

//Import react to use it

//--Retreive temporary values passed through HTML and store it in a JSON object--
let userData = {
    userID: document.getElementById("userID").textContent,
    currentUserID: document.getElementById("currentUserID").textContent,
    attachment1: {
        name: document.getElementById("attachment1Filename").textContent,
        file: null,
    },
    attachment2: {
        name: document.getElementById("attachment2Filename").textContent,
        file: null,
    },
    attachment3: {
        name: document.getElementById("attachment3Filename").textContent,
        file: null,
    },
    fname: document.getElementById("fname").textContent,
    lname: document.getElementById("lname").textContent,
    bio: document.getElementById("bio").textContent,
    deleteAccLink: document.getElementById("delete_acc_link").textContent,
    username: document.getElementById("username").textContent,
    isEditingProfile: false,
    editingDisabled: false,
    profilePicture: null,
    updateProfileErrorMessage: "NONE",
};
//-------------------------------------------------------------------------------

const profile = createRoot(document.getElementById("profile_ui"));//Tell react to latch onto the profile_ui HTML element
profile.render(React.createElement(profileUI, {userData : userData})) //render profileUI inside the container

//--Check if the user is looking at their own profile--
if (userData.userID != userData.currentUserID){ //User is looking at another user's profile
    userData.editingDisabled = true; //Prevents the user from editing this profile
}
//-----------------------------------------------------

//--Get the profile picture--
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
            userData.profilePicture = URL.createObjectURL(dataExtractedFromResponse);//Add the URL of the image to the user's data
        }
});
//---------------------------

//--Get attachment 1--
fetch("/p/"+userID+"/get_attachment/1/0", {method : "GET"}) //Call fetch send a request to the backend
    .then(responseFromFetch => { //Interpret the response given from the backend and extract any contents given by the backend
        if (responseFromFetch.status === 400){ //Input was rejected by backend
            return responseFromFetch.json(); //Extract the JSON data sent and send it to the next then()
        } else if (responseFromFetch.status === 404){ //Attachment does not exist response
            //--Insert HTML element that says "No File Attached"--
            userData.attachment1 = null;
            //----------------------------------------------------
        } else{ //Backend sent the attachment
            return responseFromFetch.blob(); //Extract the binary data of the file that was sent and send it to the next then()
        }
    }).then(dataExtractedFromResponse => { //Take the extracted contents and do something with it
        if (dataExtractedFromResponse != null && dataExtractedFromResponse.url){ //Checks if the url field exists (if not this is null and is considered falsy in JS)
            window.location.replace(dataExtractedFromResponse.url); //Switch window to 400 error page
        } else if (dataExtractedFromResponse != null){ //dataExtractedFromResponse.url = null. File was sent instead
            userData.attachment1.file = URL.createObjectURL(dataExtractedFromResponse); //Create a URL of the file blob so that the HTML file can render it properly
        }
});
//--------------------

//--Get attachment 2--
fetch("/p/"+userID+"/get_attachment/2/0", {method : "GET"}) //Call fetch send a request to the backend
    .then(responseFromFetch => { //Interpret the response given from the backend and extract any contents given by the backend
        if (responseFromFetch.status === 400){ //Input was rejected by backend
            return responseFromFetch.json(); //Extract the JSON data sent and send it to the next then()
        } else if (responseFromFetch.status === 404){ //Attachment does not exist response
            //--Insert HTML element that says "No File Attached"--
            userData.attachment2 = null;
            //----------------------------------------------------
        } else{ //Backend sent the attachment
            return responseFromFetch.blob(); //Extract the binary data of the file that was sent and send it to the next then()
        }
    }).then(dataExtractedFromResponse => { //Take the extracted contents and do something with it
        if (dataExtractedFromResponse != null && dataExtractedFromResponse.url){ //Checks if the url field exists (if not this is null and is considered falsy in JS)
            window.location.replace(dataExtractedFromResponse.url); //Switch window to 400 error page
        } else if (dataExtractedFromResponse != null){ //dataExtractedFromResponse.url = null. File was sent instead
            userData.attachment2.file = URL.createObjectURL(dataExtractedFromResponse); //Create a URL of the file blob so that the HTML file can render it properly
        }
});
//--------------------

//--Get attachment 3--
fetch("/p/"+userID+"/get_attachment/3/0", {method : "GET"}) //Call fetch send a request to the backend
    .then(responseFromFetch => { //Interpret the response given from the backend and extract any contents given by the backend
        if (responseFromFetch.status === 400){ //Input was rejected by backend
            return responseFromFetch.json(); //Extract the JSON data sent and send it to the next then()
        } else if (responseFromFetch.status === 404){ //Attachment does not exist response
            //--Insert HTML element that says "No File Attached"--
            userData.attachment3 = null;
            //----------------------------------------------------
        } else{ //Backend sent the attachment
            return responseFromFetch.blob(); //Extract the binary data of the file that was sent and send it to the next then()
        }
    }).then(dataExtractedFromResponse => { //Take the extracted contents and do something with it
        if (dataExtractedFromResponse != null && dataExtractedFromResponse.url){ //Checks if the url field exists (if not this is null and is considered falsy in JS)
            window.location.replace(dataExtractedFromResponse.url); //Switch window to 400 error page
        } else if (dataExtractedFromResponse != null){ //dataExtractedFromResponse.url = null. File was sent instead
            userData.attachment3.file = URL.createObjectURL(dataExtractedFromResponse); //Create a URL of the file blob so that the HTML file can render it properly
        }
});
//--------------------

profile.render(React.createElement(profileUI, {userData : userData})) //render profileUI inside the container

//--Functions--
document.getElementById("edit_profile_button").addEventListener("click", event =>{
    event.preventDefault(); //Stops the event (clicking the button) from triggering its default behavior 
    
    userData.isEditingProfile = true; //Tells react to load the UI as if the user is editing their profile
    profile.render(React.createElement(profileUI, {userData : userData})) //render profileUI inside the container

    //----Add event listener----
    const pfp_input_btn = document.getElementById("pfp_input_btn");
    pfp_input_btn.addEventListener("change", async event => {
        const newPFP = pfp_input_btn.files[0]; //Gets the first (of 1) selected file

        if (newPFP){//File exists
            //--Input checks--
            const fileMIMEType = newPFP.type; //Get the MIME type of the file
            const fileSize = newPFP.size; // Get the size of the file in bytes

            const wrongFileType = !(fileMIMEType === "image/png");
            const fileTooLarge = fileSize > 16000000; // checks if the file size is greater than 16MB

            if (wrongFileType){//User input failed front-end check
                userData.updateProfileErrorMessage = "PFP_ERROR_MESSAGE";
            } else if (fileTooLarge){ //User input failed front-end check
                userData.updateProfileErrorMessage = "PFP_TOO_LARGE";
            //----------------
            } else{//User input passed front-end check
                const formData = new FormData(); //Creates a FormData object to pass to the backend
                formData.append("newPFP", newPFP); //Adds the new pfp file as a value with key 'newpfp'

                const response = await fetch("/p/"+userID+"/submit_pfp", { //Send response to backend
                    method : "POST",
                    body : formData
                });

                if (response.success === false){ //Backend rejected input
                    userData.updateProfileErrorMessage = "PFP_TOO_LARGE";
                } else if (response.status === 400){//Backend rejected input due to front end tampering
                    window.location.replace(results.url); //Send the user to the 400 error page
                } else if (response.status === 413){ //Input is too large
                    userData.updateProfileErrorMessage = "PFP_ERROR_MESSAGE";
                } else{ //Backend sent back a file to render
                    const fileBlob = await response.blob(); //Get the binary data of the file that was sent 
                    userData.profilePicture = URL.createObjectURL(fileBlob); //Create a URL of the fileBlob so that the HTML file can render it properly
                    userData.updateProfileErrorMessage = "NONE"; //Reset the error message
                }
            }
            profile.render(React.createElement(profileUI, {userData : userData})) //render profileUI inside the container
        }
    });
    //--------------------------

    //----Add event listener----
    const attach_input_1 = document.getElementById("attach_input_1");
    attach_input_1.addEventListener("change", async event => {
        const newAttach = attach_input_1.files[0]; //Gets the first (of 1) selected file

        if (newAttach){//File exists
            //--Input checks--
            const fileMIMEType = newAttach.type; //Get the MIME type of the file
            const fileSize = newAttach.size; // Get the size of the file in bytes

            const wrongFileType = !(fileMIMEType === "application/pdf");
            const fileTooLarge = fileSize > 16000000; // checks if the file size is greater than 16MB

            if (wrongFileType){//User input failed front-end check
                userData.updateProfileErrorMessage = "ATTACHMENT_ERROR_MESSAGE";
            } else if (fileTooLarge){ //User input failed front-end check
                userData.updateProfileErrorMessage = "ATTACHMENT_TOO_LARGE";
            //----------------
            } else{//User input passed front-end check
                const formData = new FormData(); //Creates a FormData object to pass to the backend
                formData.append("newAttach", newAttach); //Adds the new PDF file as a value with key 'newAttach'

                const response = await fetch("/p/"+userID+"/change_attachment/1", { //Send response to backend
                    method : "POST",
                    body : formData
                });

                if (response.success === false){ //Backend rejected input
                    userData.updateProfileErrorMessage = "ATTACHMENT_ERROR_MESSAGE";
                } else if (response.status === 400){//Backend rejected input due to front end tampering
                    window.location.replace(results.url); //Send the user to the 400 error page
                } else if (response.status === 413){ //Input is too large
                    userData.updateProfileErrorMessage = "ATTACHMENT_TOO_LARGE";
                } else{ //Backend sent back a file to render
                    const fileBlob = await response.blob(); //Get the binary data of the file that was sent 

                    //--Call the backend to get the file name--
                    const fileNameRequest = await fetch("/p/"+userID+"/get_attachment/1/1", {method: "GET"});
                    const fileNameResponse = await fileNameRequest.json();

                    if (!fileNameResponse.fileName){ //Does not exist -> URL was tampered by front-end and error was thrown
                        window.location.replace(fileNameResponse.url); //Redirect to error page
                    }
                    //-----------------------------------------

                    //--Update attachment--
                    userData.attachment1 = {
                        name: fileNameResponse.fileName,
                        file: URL.createObjectURL(fileBlob), //Create a URL of the fileBlob so that the HTML file can render it properly
                    };
                    //---------------------

                    userData.updateProfileErrorMessage = "NONE"; //Reset error message
                }
            }
            profile.render(React.createElement(profileUI, {userData : userData})) //render profileUI inside the container
        }
    });
    //--------------------------

    //----Add event listener----
    const attach_input_2 = document.getElementById("attach_input_2");
    attach_input_2.addEventListener("change", async event => {
        const newAttach = attach_input_2.files[0]; //Gets the first (of 1) selected file

        if (newAttach){//File exists
            //--Input checks--
            const fileMIMEType = newAttach.type; //Get the MIME type of the file
            const fileSize = newAttach.size; // Get the size of the file in bytes

            const wrongFileType = !(fileMIMEType === "application/pdf");
            const fileTooLarge = fileSize > 16000000; // checks if the file size is greater than 16MB

            if (wrongFileType){//User input failed front-end check
                userData.updateProfileErrorMessage = "ATTACHMENT_ERROR_MESSAGE";
            } else if (fileTooLarge){ //User input failed front-end check
                userData.updateProfileErrorMessage = "ATTACHMENT_TOO_LARGE";
            //----------------
            } else{//User input passed front-end check
                const formData = new FormData(); //Creates a FormData object to pass to the backend
                formData.append("newAttach", newAttach); //Adds the new PDF file as a value with key 'newAttach'

                const response = await fetch("/p/"+userID+"/change_attachment/2", { //Send response to backend
                    method : "POST",
                    body : formData
                });

                if (response.success === false){ //Backend rejected input
                    userData.updateProfileErrorMessage = "ATTACHMENT_ERROR_MESSAGE";
                } else if(response.status === 400){//Backend rejected input due to front end tampering
                    window.location.replace(results.url); //Send the user to the 400 error page
                } else if(response.status === 413){ //Input is too large
                    userData.updateProfileErrorMessage = "ATTACHMENT_TOO_LARGE";
                } else{ //Backend sent back a file to render
                    const fileBlob = await response.blob(); //Get the binary data of the file that was sent

                    //--Call the backend to get the file name--
                    const fileNameRequest = await fetch("/p/"+userID+"/get_attachment/2/1", {method: "GET"});
                    const fileNameResponse = await fileNameRequest.json();

                    if (!fileNameResponse.fileName){ //Does not exist -> URL was tampered by front-end and error was thrown
                        window.location.replace(fileNameResponse.url); //Redirect to error page
                    }
                    //-----------------------------------------

                    //--Update attachment--
                    userData.attachment2 = {
                        name: fileNameResponse.fileName,
                        file: URL.createObjectURL(fileBlob), //Create a URL of the fileBlob so that the HTML file can render it properly
                    };
                    //---------------------

                    userData.updateProfileErrorMessage = "NONE"; //Reset error message
                }
            }
            profile.render(React.createElement(profileUI, {userData : userData})) //render profileUI inside the container
        }
    });
    //--------------------------

    //----Add event listener----
    const attach_input_3 = document.getElementById("attach_input_3");
    attach_input_3.addEventListener("change", async event => {
        const newAttach = attach_input_3.files[0]; //Gets the first (of 1) selected file

        if (newAttach){//File exists
            //--Input checks--
            const fileMIMEType = newAttach.type; //Get the MIME type of the file
            const fileSize = newAttach.size; // Get the size of the file in bytes

            const wrongFileType = !(fileMIMEType === "application/pdf");
            const fileTooLarge = fileSize > 16000000; // checks if the file size is greater than 16MB

            if (wrongFileType){//User input failed front-end check
                userData.updateProfileErrorMessage = "ATTACHMENT_ERROR_MESSAGE";
            } else if (fileTooLarge){ //User input failed front-end check
                userData.updateProfileErrorMessage = "ATTACHMENT_TOO_LARGE";
            //----------------
            } else{//User input passed front-end check
                const formData = new FormData(); //Creates a FormData object to pass to the backend
                formData.append("newAttach", newAttach); //Adds the new PDF file as a value with key 'newAttach'

                const response = await fetch("/p/"+userID+"/change_attachment/3", { //Send response to backend
                    method : "POST",
                    body : formData
                });

                if (response.success === false){ //Backend rejected input
                    userData.updateProfileErrorMessage = "ATTACHMENT_ERROR_MESSAGE";
                } else if (response.status === 400){ //Backend rejected input due to front end tampering
                    window.location.replace(results.url); //Send the user to the 400 error page
                } else if(response.status === 413){ //Input is too large
                    userData.updateProfileErrorMessage = "ATTACHMENT_TOO_LARGE";
                } else{ //Backend sent back a file to render
                    const fileBlob = await response.blob(); //Get the binary data of the file that was sent

                    //--Call the backend to get the file name--
                    const fileNameRequest = await fetch("/p/"+userID+"/get_attachment/3/1", {method: "GET"});
                    const fileNameResponse = await fileNameRequest.json();

                    if (!fileNameResponse.fileName){ //Does not exist -> URL was tampered by front-end and error was thrown
                        window.location.replace(fileNameResponse.url); //Redirect to error page
                    }
                    //-----------------------------------------

                    //--Update attachment--
                    userData.attachment3 = {
                        name: fileNameResponse.fileName,
                        file: URL.createObjectURL(fileBlob), //Create a URL of the fileBlob so that the HTML file can render it properly
                    };
                    //---------------------

                    userData.updateProfileErrorMessage = "NONE"; //Reset error message
                }
            }
            profile.render(React.createElement(profileUI, {userData : userData})) //render profileUI inside the container
        }
    });
    //--------------------------
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
        userData.updateProfileErrorMessage = "ERROR_MESSAGE";
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
            userData.updateProfileErrorMessage = "ERROR_MESSAGE";
        } else if (results.success === true){//Form was accepted by backend
            userData.isEditingProfile = false;

            //--Updates each profile attribute to reflect the changes the user made--
            if (document.getElementById("username").value.length != 0){//User changed the attribute
                userData.username = document.getElementById("username").value;
            }

            if (document.getElementById("fname").value.length != 0){//User changed the attribute
                if (document.getElementById("fname").value.length > 20){ //the new fname is more than 20 characters long
                    const shortenedFname = document.getElementById("fname").value.substring(0, 17) + "...";
                    userData.fname = shortenedFname; //Replace the fname visible on the website with the shortend version
                } else{
                    userData.fname = document.getElementById("fname").value;
                }
            }

            if (document.getElementById("lname").value.length != 0){//User changed the attribute
                if (document.getElementById("lname").value.length > 20){ //the new lname is more than 20 characters long
                    const shortenedLname = document.getElementById("lname").value.substring(0, 17) + "...";
                    userData.lname = shortenedLname; //Replace the lname visible on the website with the shortend version
                } else{
                    userData.lname = document.getElementById("lname").value;
                }
            }

            if (document.getElementById("bio").value.length != 0){//User changed the attribute
                userData.bio = document.getElementById("bio").value;
            }
            //-----------------------------------------------------------------------
        } else{ //An error occurred in the backend as a result of malformed user input
            window.location.replace(results.url); //Send the user to the 400 error page
        }
        //-------------------------
    }
    profile.render(React.createElement(profileUI, {userData : userData})) //render profileUI inside the container
});
//-------------