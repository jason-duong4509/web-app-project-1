import { io } from "socket.io-client"; //Import io to use web sockets

//Define a userData JSON so this file can keep track of profile changes easily
let userData = {
    userID: null, //userID of profile we are viewing
    currentUserID: null, //userID of the user
    attachment1: {
        name: null,
        file: null,
    },
    attachment2: {
        name: null,
        file: null,
    },
    attachment3: {
        name: null,
        file: null,
    },
    fname: null,
    lname: null,
    bio: null,
    deleteAccLink: null,
    username: null,
    isEditingProfile: false,
    editingDisabled: false,
    profilePicture: null,
    updateProfileErrorMessage: null,
};

let webSocket;

//Function to initializ data into the react UI
export async function initializeData(viewingUserID, returnFunction){
    let newUserDataObject = {};
    //--Fetch initial user data--
    await fetch("/p/"+viewingUserID+"/getData", {method : "GET"}) //Call fetch send a request to the backend
    .then(responseFromFetch => { //Interpret the response given from the backend and extract any contents given by the backend
        return responseFromFetch.json(); //Extract the JSON data sent and send it to the next then()
    }).then(dataExtractedFromResponse => { //Take the extracted contents and do something with it
        if (dataExtractedFromResponse.url){ //Checks if the url field exists (if not this is null and is considered falsy in JS)
            window.location.replace(dataExtractedFromResponse.url); //Switch window to 400 error page
        } else{ //dataExtractedFromResponse.url = null. JSON was sent instead
            newUserDataObject = dataExtractedFromResponse; //dataExtractedFromResponse contains the user JSON data
        }
    });
    //---------------------------

    //--Fetch profile picture--
    await fetch("/p/"+viewingUserID+"/get_pfp", {method : "GET"}) //Call fetch send a request to the backend
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
            newUserDataObject.profilePicture = URL.createObjectURL(dataExtractedFromResponse);//Add the URL of the image to the user's data
        }
    });
    //-------------------------

    //--Fetch attachment 1--
    await fetch("/p/"+viewingUserID+"/get_attachment/1/0", {method : "GET"}) //Call fetch send a request to the backend
    .then(responseFromFetch => { //Interpret the response given from the backend and extract any contents given by the backend
        if (responseFromFetch.status === 400){ //Input was rejected by backend
            return responseFromFetch.json(); //Extract the JSON data sent and send it to the next then()
        } else if (responseFromFetch.status === 404){ //Attachment does not exist response
            //--Insert HTML element that says "No File Attached"--
            newUserDataObject.attachment1 = null;
            //----------------------------------------------------
        } else{ //Backend sent the attachment
            return responseFromFetch.blob(); //Extract the binary data of the file that was sent and send it to the next then()
        }
    }).then(dataExtractedFromResponse => { //Take the extracted contents and do something with it
        if (dataExtractedFromResponse != null && dataExtractedFromResponse.url){ //Checks if the url field exists (if not this is null and is considered falsy in JS)
            window.location.replace(dataExtractedFromResponse.url); //Switch window to 400 error page
        } else if (dataExtractedFromResponse != null){ //dataExtractedFromResponse.url = null. File was sent instead
            newUserDataObject.attachment1.file = URL.createObjectURL(dataExtractedFromResponse); //Create a URL of the file blob so that the HTML file can render it properly
        }
    });
    //----------------------

    //--Fetch attachment 2--
    await fetch("/p/"+viewingUserID+"/get_attachment/2/0", {method : "GET"}) //Call fetch send a request to the backend
    .then(responseFromFetch => { //Interpret the response given from the backend and extract any contents given by the backend
        if (responseFromFetch.status === 400){ //Input was rejected by backend
            return responseFromFetch.json(); //Extract the JSON data sent and send it to the next then()
        } else if (responseFromFetch.status === 404){ //Attachment does not exist response
            //--Insert HTML element that says "No File Attached"--
            newUserDataObject.attachment2 = null;
            //----------------------------------------------------
        } else{ //Backend sent the attachment
            return responseFromFetch.blob(); //Extract the binary data of the file that was sent and send it to the next then()
        }
    }).then(dataExtractedFromResponse => { //Take the extracted contents and do something with it
        if (dataExtractedFromResponse != null && dataExtractedFromResponse.url){ //Checks if the url field exists (if not this is null and is considered falsy in JS)
            window.location.replace(dataExtractedFromResponse.url); //Switch window to 400 error page
        } else if (dataExtractedFromResponse != null){ //dataExtractedFromResponse.url = null. File was sent instead
            newUserDataObject.attachment2.file = URL.createObjectURL(dataExtractedFromResponse); //Create a URL of the file blob so that the HTML file can render it properly
        }
    });
    //----------------------

    //--Fetch attachment 3--
    await fetch("/p/"+viewingUserID+"/get_attachment/3/0", {method : "GET"}) //Call fetch send a request to the backend
    .then(responseFromFetch => { //Interpret the response given from the backend and extract any contents given by the backend
        if (responseFromFetch.status === 400){ //Input was rejected by backend
            return responseFromFetch.json(); //Extract the JSON data sent and send it to the next then()
        } else if (responseFromFetch.status === 404){ //Attachment does not exist response
            //--Insert HTML element that says "No File Attached"--
            newUserDataObject.attachment3 = null;
            //----------------------------------------------------
        } else{ //Backend sent the attachment
            return responseFromFetch.blob(); //Extract the binary data of the file that was sent and send it to the next then()
        }
    }).then(dataExtractedFromResponse => { //Take the extracted contents and do something with it
        if (dataExtractedFromResponse != null && dataExtractedFromResponse.url){ //Checks if the url field exists (if not this is null and is considered falsy in JS)
            window.location.replace(dataExtractedFromResponse.url); //Switch window to 400 error page
        } else if (dataExtractedFromResponse != null){ //dataExtractedFromResponse.url = null. File was sent instead
            newUserDataObject.attachment3.file = URL.createObjectURL(dataExtractedFromResponse); //Create a URL of the file blob so that the HTML file can render it properly
        }
    });
    //----------------------

    copyUserdata(newUserDataObject);
    returnFunction(newUserDataObject); //use react's given use state function to update state of UI
}

//Function to set up a web socket for real time updates from the backend
export function initializeWebSocket(returnFunction){
    if (webSocket == null){//Haven't yet made a websocket
        webSocket = io(); //Connects to the backend (no params mean that it'll default to using the same domain which is the case here)

        webSocket.on("message", (jsonResponse) => { //Runs when the front end receives a message from the backend 
            const profileID = jsonResponse.id;//Get the ID passed from the backend
            
            if (profileID == userData.userID){ //The information sent by the backend is information for the profile we are viewing (prevents refreshing data for profiles we are not viewing) 
                initializeData(profileID, returnFunction); //Call this JS function to get the new state of this profile and update it using the given react use state function
            }
        });
    }
}

//Close the websocket when ran
export function closeWebSocket(){
    if (webSocket != null){//Already made a websocket
        webSocket.close(); //Close the websocket
        webSocket = null; 
    }
}

export function setEditProfileState(newState, returnFunction){
    const newUserDataObject = {isEditingProfile: newState}; //Change isEditingProfile state to newState
    copyUserdata(newUserDataObject); //Call a helper function to perform a deep copy and transfer JSON data from the old userData to this new object
    returnFunction(newUserDataObject);
}

//Perform a deep copy of the old userData object and place it into newUserDataObject
function copyUserdata(newUserDataObject){
    if (newUserDataObject.userID == null){//Hasn't been changed
        newUserDataObject.userID = userData.userID; //Copy over ONLY the value
    }

    if (newUserDataObject.currentUserID == null){//Hasn't been changed
        newUserDataObject.currentUserID = userData.currentUserID; //Copy over ONLY the value
    }

    const attachment1Exists = userData.attachment1 != null && userData.attachment1.name != null && userData.attachment1.file != null;
    if (newUserDataObject.attachment1 == null && attachment1Exists){//Hasn't been changed and the old userData has an attachment
        newUserDataObject.attachment1 = userData.attachment1; //Copy over ONLY the value
    }

    const attachment2Exists = userData.attachment2 != null && userData.attachment2.name != null && userData.attachment2.file != null;
    if (newUserDataObject.attachment2 == null && attachment2Exists){//Hasn't been changed
        newUserDataObject.attachment2 = userData.attachment2; //Copy over ONLY the value
    }

    const attachment3Exists = userData.attachment3 != null && userData.attachment3.name != null && userData.attachment3.file != null;
    if (newUserDataObject.attachment3 == null && attachment3Exists){//Hasn't been changed
        newUserDataObject.attachment3 = userData.attachment3; //Copy over ONLY the value
    }

    if (newUserDataObject.fname == null){//Hasn't been changed
        newUserDataObject.fname = userData.fname; //Copy over ONLY the value
    }

    if (newUserDataObject.lname == null){//Hasn't been changed
        newUserDataObject.lname = userData.lname; //Copy over ONLY the value
    }

    if (newUserDataObject.bio == null){//Hasn't been changed
        newUserDataObject.bio = userData.bio; //Copy over ONLY the value
    }

    if (newUserDataObject.deleteAccLink == null){//Hasn't been changed
        newUserDataObject.deleteAccLink = userData.deleteAccLink; //Copy over ONLY the value
    }
    
    if (newUserDataObject.username == null){//Hasn't been changed
        newUserDataObject.username = userData.username; //Copy over ONLY the value
    }

    if (newUserDataObject.isEditingProfile == null){//Hasn't been changed
        newUserDataObject.isEditingProfile = userData.isEditingProfile; //Copy over ONLY the value
    }

    if (newUserDataObject.editingDisabled == null){//Hasn't been changed
        newUserDataObject.editingDisabled = userData.editingDisabled; //Copy over ONLY the value
    }

    if (newUserDataObject.profilePicture == null){//Hasn't been changed
        newUserDataObject.profilePicture = userData.profilePicture; //Copy over ONLY the value
    }

    if (newUserDataObject.updateProfileErrorMessage == null){//Hasn't been changed
        newUserDataObject.updateProfileErrorMessage = userData.updateProfileErrorMessage; //Copy over ONLY the value
    }

    userData = newUserDataObject; //Change the reference of userData to the its new object version
}

//Change profile picture
export async function changeProfilePicture(returnFunction){
    const newPFP = document.getElementById("pfp_input_btn").files[0]; //Gets the first (of 1) selected file

    if (newPFP){//File exists
        const newUserDataObject = {};
        //--Input checks--
        const fileMIMEType = newPFP.type; //Get the MIME type of the file
        const fileSize = newPFP.size; // Get the size of the file in bytes

        const wrongFileType = !(fileMIMEType === "image/png");
        const fileTooLarge = fileSize > 16000000; // checks if the file size is greater than 16MB

        if (wrongFileType){//User input failed front-end check
            newUserDataObject.updateProfileErrorMessage = "PFP_ERROR_MESSAGE";
        } else if (fileTooLarge){ //User input failed front-end check
            newUserDataObject.updateProfileErrorMessage = "PFP_TOO_LARGE";
        //----------------
        } else{//User input passed front-end check
            const formData = new FormData(); //Creates a FormData object to pass to the backend
            formData.append("newPFP", newPFP); //Adds the new pfp file as a value with key 'newpfp'

            const response = await fetch("/p/"+userData.userID+"/submit_pfp", { //Send response to backend
                method : "POST",
                body : formData
            });

            if (response.success === false){ //Backend rejected input
                newUserDataObject.updateProfileErrorMessage = "PFP_TOO_LARGE";
            } else if (response.status === 400){//Backend rejected input due to front end tampering
                window.location.replace(results.url); //Send the user to the 400 error page
            } else if (response.status === 413){ //Input is too large
                newUserDataObject.updateProfileErrorMessage = "PFP_ERROR_MESSAGE";
            } else{ //Backend sent back a file to render
                const fileBlob = await response.blob(); //Get the binary data of the file that was sent 
                newUserDataObject.profilePicture = URL.createObjectURL(fileBlob); //Create a URL of the fileBlob so that the HTML file can render it properly
                newUserDataObject.updateProfileErrorMessage = "NONE"; //Reset the error message
            }
        }
        console.log("is editing profile" + newUserDataObject.isEditingProfile);
        copyUserdata(newUserDataObject);
        console.log("is editing profile" + newUserDataObject.isEditingProfile);
        returnFunction(newUserDataObject); //Call the given react function to update state 
    };
}

//Change attachment 1
export async function changeAttachment1(returnFunction){
    const newAttach = document.getElementById("attach_input_1").files[0]; //Gets the first (of 1) selected file

    if (newAttach){//File exists
        const newUserDataObject = {};
        //--Input checks--
        const fileMIMEType = newAttach.type; //Get the MIME type of the file
        const fileSize = newAttach.size; // Get the size of the file in bytes

        const wrongFileType = !(fileMIMEType === "application/pdf");
        const fileTooLarge = fileSize > 16000000; // checks if the file size is greater than 16MB

        if (wrongFileType){//User input failed front-end check
            newUserDataObject.updateProfileErrorMessage = "ATTACHMENT_ERROR_MESSAGE";
        } else if (fileTooLarge){ //User input failed front-end check
            newUserDataObject.updateProfileErrorMessage = "ATTACHMENT_TOO_LARGE";
        //----------------
        } else{//User input passed front-end check
            const formData = new FormData(); //Creates a FormData object to pass to the backend
            formData.append("newAttach", newAttach); //Adds the new PDF file as a value with key 'newAttach'

            const response = await fetch("/p/"+userData.userID+"/change_attachment/1", { //Send response to backend
                method : "POST",
                body : formData
            });

            if (response.success === false){ //Backend rejected input
                newUserDataObject.updateProfileErrorMessage = "ATTACHMENT_ERROR_MESSAGE";
            } else if (response.status === 400){//Backend rejected input due to front end tampering
                window.location.replace(results.url); //Send the user to the 400 error page
            } else if (response.status === 413){ //Input is too large
                newUserDataObject.updateProfileErrorMessage = "ATTACHMENT_TOO_LARGE";
            } else{ //Backend sent back a file to render
                const fileBlob = await response.blob(); //Get the binary data of the file that was sent 

                //--Call the backend to get the file name--
                const fileNameRequest = await fetch("/p/"+userData.userID+"/get_attachment/1/1", {method: "GET"});
                const fileNameResponse = await fileNameRequest.json();

                if (!fileNameResponse.fileName){ //Does not exist -> URL was tampered by front-end and error was thrown
                    window.location.replace(fileNameResponse.url); //Redirect to error page
                }
                //-----------------------------------------

                //--Update attachment--
                newUserDataObject.attachment1 = {
                    name: fileNameResponse.fileName,
                    file: URL.createObjectURL(fileBlob), //Create a URL of the fileBlob so that the HTML file can render it properly
                };
                //---------------------

                newUserDataObject.updateProfileErrorMessage = "NONE"; //Reset error message
            }
        }
        copyUserdata(newUserDataObject);
        returnFunction(newUserDataObject); //Call given react function to update UI state
    }
}

//Change attachment 2
export async function changeAttachment2(returnFunction){
    const newAttach = document.getElementById("attach_input_2").files[0]; //Gets the first (of 1) selected file

    if (newAttach){//File exists
        const newUserDataObject = {};
        //--Input checks--
        const fileMIMEType = newAttach.type; //Get the MIME type of the file
        const fileSize = newAttach.size; // Get the size of the file in bytes

        const wrongFileType = !(fileMIMEType === "application/pdf");
        const fileTooLarge = fileSize > 16000000; // checks if the file size is greater than 16MB

        if (wrongFileType){//User input failed front-end check
            newUserDataObject.updateProfileErrorMessage = "ATTACHMENT_ERROR_MESSAGE";
        } else if (fileTooLarge){ //User input failed front-end check
            newUserDataObject.updateProfileErrorMessage = "ATTACHMENT_TOO_LARGE";
        //----------------
        } else{//User input passed front-end check
            const formData = new FormData(); //Creates a FormData object to pass to the backend
            formData.append("newAttach", newAttach); //Adds the new PDF file as a value with key 'newAttach'

            const response = await fetch("/p/"+userData.userID+"/change_attachment/2", { //Send response to backend
                method : "POST",
                body : formData
            });

            if (response.success === false){ //Backend rejected input
                newUserDataObject.updateProfileErrorMessage = "ATTACHMENT_ERROR_MESSAGE";
            } else if(response.status === 400){//Backend rejected input due to front end tampering
                window.location.replace(results.url); //Send the user to the 400 error page
            } else if(response.status === 413){ //Input is too large
                newUserDataObject.updateProfileErrorMessage = "ATTACHMENT_TOO_LARGE";
            } else{ //Backend sent back a file to render
                const fileBlob = await response.blob(); //Get the binary data of the file that was sent

                //--Call the backend to get the file name--
                const fileNameRequest = await fetch("/p/"+userData.userID+"/get_attachment/2/1", {method: "GET"});
                const fileNameResponse = await fileNameRequest.json();

                if (!fileNameResponse.fileName){ //Does not exist -> URL was tampered by front-end and error was thrown
                    window.location.replace(fileNameResponse.url); //Redirect to error page
                }
                //-----------------------------------------

                //--Update attachment--
                newUserDataObject.attachment2 = {
                    name: fileNameResponse.fileName,
                    file: URL.createObjectURL(fileBlob), //Create a URL of the fileBlob so that the HTML file can render it properly
                };
                //---------------------

                newUserDataObject.updateProfileErrorMessage = "NONE"; //Reset error message
            }
        }
        copyUserdata(newUserDataObject);
        returnFunction(newUserDataObject); //Use given react function to update UI state
    }
}

//Change attachment 3
export async function changeAttachment3(returnFunction){
    const newAttach = document.getElementById("attach_input_3").files[0]; //Gets the first (of 1) selected file

    if (newAttach){//File exists
        const newUserDataObject = {};
        //--Input checks--
        const fileMIMEType = newAttach.type; //Get the MIME type of the file
        const fileSize = newAttach.size; // Get the size of the file in bytes

        const wrongFileType = !(fileMIMEType === "application/pdf");
        const fileTooLarge = fileSize > 16000000; // checks if the file size is greater than 16MB

        if (wrongFileType){//User input failed front-end check
            newUserDataObject.updateProfileErrorMessage = "ATTACHMENT_ERROR_MESSAGE";
        } else if (fileTooLarge){ //User input failed front-end check
            newUserDataObject.updateProfileErrorMessage = "ATTACHMENT_TOO_LARGE";
        //----------------
        } else{//User input passed front-end check
            const formData = new FormData(); //Creates a FormData object to pass to the backend
            formData.append("newAttach", newAttach); //Adds the new PDF file as a value with key 'newAttach'

            const response = await fetch("/p/"+userData.userID+"/change_attachment/3", { //Send response to backend
                method : "POST",
                body : formData
            });

            if (response.success === false){ //Backend rejected input
                newUserDataObject.updateProfileErrorMessage = "ATTACHMENT_ERROR_MESSAGE";
            } else if (response.status === 400){ //Backend rejected input due to front end tampering
                window.location.replace(results.url); //Send the user to the 400 error page
            } else if(response.status === 413){ //Input is too large
                newUserDataObject.updateProfileErrorMessage = "ATTACHMENT_TOO_LARGE";
            } else{ //Backend sent back a file to render
                const fileBlob = await response.blob(); //Get the binary data of the file that was sent

                //--Call the backend to get the file name--
                const fileNameRequest = await fetch("/p/"+userData.userID+"/get_attachment/3/1", {method: "GET"});
                const fileNameResponse = await fileNameRequest.json();

                if (!fileNameResponse.fileName){ //Does not exist -> URL was tampered by front-end and error was thrown
                    window.location.replace(fileNameResponse.url); //Redirect to error page
                }
                //-----------------------------------------

                //--Update attachment--
                newUserDataObject.attachment3 = {
                    name: fileNameResponse.fileName,
                    file: URL.createObjectURL(fileBlob), //Create a URL of the fileBlob so that the HTML file can render it properly
                };
                //---------------------

                newUserDataObject.updateProfileErrorMessage = "NONE"; //Reset error message
            }
        }
        copyUserdata(newUserDataObject);
        returnFunction(newUserDataObject); //Use given react function to update UI state
    }
}

//Function that updates the database (via the backend) with new profile information
export async function submitProfileInfo(event, returnFunction){
    const newUserDataObject = {};
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
        newUserDataObject.updateProfileErrorMessage = "ERROR_MESSAGE";
    //------------------------
    } else{ //User input accepted by front-end
        //--Send the form--
        const newProfileInfo = new FormData(event.target); //Convert the form's inputs into a FormData object
        newProfileInfo.append("user_id", userData.userID); //Add the userID of the profile to the form
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
            newUserDataObject.updateProfileErrorMessage = "ERROR_MESSAGE";
        } else if (results.success === true){//Form was accepted by backend
            console.log("CALLED THIS FUNCTION FOR SOME REASON")
            newUserDataObject.isEditingProfile = false;

            //--Updates each profile attribute to reflect the changes the user made--
            if (document.getElementById("username").value.length != 0){//User changed the attribute
                newUserDataObject.username = document.getElementById("username").value;
            }

            if (document.getElementById("fname").value.length != 0){//User changed the attribute
                if (document.getElementById("fname").value.length > 20){ //the new fname is more than 20 characters long
                    const shortenedFname = document.getElementById("fname").value.substring(0, 17) + "...";
                    newUserDataObject.fname = shortenedFname; //Replace the fname visible on the website with the shortend version
                } else{
                    newUserDataObject.fname = document.getElementById("fname").value;
                }
            }

            if (document.getElementById("lname").value.length != 0){//User changed the attribute
                if (document.getElementById("lname").value.length > 20){ //the new lname is more than 20 characters long
                    const shortenedLname = document.getElementById("lname").value.substring(0, 17) + "...";
                    newUserDataObject.lname = shortenedLname; //Replace the lname visible on the website with the shortend version
                } else{
                    newUserDataObject.lname = document.getElementById("lname").value;
                }
            }

            if (document.getElementById("bio").value.length != 0){//User changed the attribute
                newUserDataObject.bio = document.getElementById("bio").value;
            }
            //-----------------------------------------------------------------------
        } else{ //An error occurred in the backend as a result of malformed user input
            window.location.replace(results.url); //Send the user to the 400 error page
        }
        //-------------------------
    }
    copyUserdata(newUserDataObject);
    returnFunction(newUserDataObject); //Use given react function to update state UI
}
//-------------