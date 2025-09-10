import { useState } from 'react' //Import useState so that editing DOMs based on state change can be achieved

function Profile() { //Component function Profile() that is used when react loads this DOM
  const [profileData, setProfile] = useState(null) //useState(null) = [null, nameOfFunctionToUpdateDOM]

  if (profileData === null){//The profile UI has not been rendered yet
    fetch("ADD LINK", {method : "GET"}) //Call fetch send a request to the backend
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
  }

  return ( //Return the following HTML 
    <>
        <form action="/home" method="GET">
            <input type="submit" id="back_button" value="Back"></input>
        </form>

        <form id="profile_info">
            <label for="username" id="username_label" hidden>Username:</label>
            <input type="text" name="username" id="username" value="{{username}}" placeholder="{{username}}" disabled></input>
            <input type="text" name="fname" id="fname" value="{{fname}}" placeholder="{{fname}}" disabled></input>
            <input type="text" name="lname" id="lname" value="{{lname}}" placeholder="{{lname}}" disabled></input>
            <label id="bio_label" for="bio">About</label>
            <textarea name="bio" id="bio" placeholder="{{bio}}" disabled>{{bio}}</textarea>
            <label for="password" id="password_label" hidden>Password:</label>
            <input type="password" name="password" id="password" disabled hidden placeholder="********"></input>
            <label id="attachments_label">Attachments</label>
            <input type="submit" id="save_changes" value="Save Changes" hidden disabled></input>
        </form>

        <button type="button" id="edit_profile_button">Edit Profile</button>

        <form action="{{url_for('onDeleteAccount', user_id=user_id)}}">
            <button id="delete_button" type="submit" disabled hidden>Delete Account</button>
        </form>

        <p id="error_message" style="color:red;" hidden>Unable to save changes. Please check your information and try again.</p>
        
        <p id="something_went_wrong_message" style="color:red;" hidden>An error occurred. Please try again.</p>
        
        <p id="pfp_error_message" style="color:red;" hidden>Only PNG files are allowed.</p>

        <p id="pfp_too_large" style="color:red;" hidden>Only PNGs up to 16MB are accepted.</p>

        <p id="attachment_error_message" style="color:red;" hidden>Only PDF files are allowed.</p>

        <p id="attachment_too_large" style="color:red;" hidden>Only PDFs up to 16MB are accepted.</p>
    </>
    )
}

export default Profile //When a file imports this without a named export, export Profile() by default
