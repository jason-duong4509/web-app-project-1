import {submitProfileInfo, changeAttachment3, changeAttachment2, changeAttachment1, changeProfilePicture, setEditProfileState, initializeWebSocket, initializeData, closeWebSocket} from "../js/profile.js" //Import functions to use it
import React from "react" //Import react to use useEffect() and useState()

//Component function Profile() that simply loads the profile UI
function Profile({navigateTo}) {
  const [userData, updateUserData] = React.useState(null) //Define use state function so that the profile UI can be updated

  //--Open a web socket for real time data updates--
  React.useEffect(() => {
    initializeWebSocket((jsonData) => {updateUserData(jsonData)}) //Call JS' initializeWebSocket() function and pass a function as a parameter so JS can use it once it receives a websocket connection
    return () => { //Return (cleanup) function that runs when the component unmounts
      closeWebSocket() //Call JS function to close the websocket
    }
  }, {}) //useEffect(doSomethingHere, rerun condition). useEffect() reruns if the rerun condition changes. By using {}, this'll never change therefore this runs once
  //------------------------------------------------

  //--Run this exactly once to give the UI some initial data--
  React.useEffect(() => {
    const profileID = window.location.pathname.substring(3) //Get the profie ID from the URL
    initializeData(profileID, updateUserData) //Call JS function to get initial profile data. Pass in profile ID for identification plus the UI's useState function for state changes later
  }, {}) //useEffect(doSomethingHere, rerun condition). useEffect() reruns if the rerun condition changes. By using {}, this'll never change therefore this runs once
  //----------------------------------------------------------

  //--Turn profile edits on--
  function turnOnProfileEdits(){
    console.log("TURN ON PROFILE EDITS")
    setEditProfileState(true, updateUserData) //Call JS file to change profile state then update the UI with the new state
  }
  //-------------------------

  //--Change profile picture--
  function changePFP(){
    changeProfilePicture(updateUserData)
  }
  //--------------------------

  //--Change attachment 1--
  function changeAttach1(){
    changeAttachment1(updateUserData)
  }
  //-----------------------

  //--Change attachment 2--
  function changeAttach2(){
    changeAttachment2(updateUserData)
  }
  //-----------------------

  //--Change attachment 3--
  function changeAttach3(){
    changeAttachment3(updateUserData)
  }
  //-----------------------

  //--Save profile changes--
  function saveProfileChanges(event){
    event.preventDefault() //Prevent the form from doing anything weird
    submitProfileInfo(event, updateUserData) //Give the JS function the event object so it can parse it on its own and the useState function for changing the UI state later
  }
  //------------------------

  if (userData == null){//Ensures that react renders nothing until JS is done preparing the initial state of the UI
    return <></>
  } else{//JS is done preparing the initial state of the UI
    console.log("IS EDIT BUTTON REMOVED " + userData.isEditingProfile)
    //--Renders the UI--
    return (
      <>
        {/*--Import CSS--*/}
        <link rel="stylesheet" href="/static/dist/assets/profile.css"/>
        {/*--------------*/}
        {/*--Profile form elements (username, bio, fname, password, etc)--*/}
        <form id="profile_info" onSubmit={saveProfileChanges}>
            {userData.isEditingProfile && <label for="username" id="username_label">Username:</label>}
            {!userData.isEditingProfile && <input type="text" name="username" id="username" value={userData.username} placeholder={userData.username} disabled></input>}
            {userData.isEditingProfile && <input type="text" name="username" id="username" value="" placeholder={userData.username}></input>}

            {!userData.isEditingProfile && <input type="text" name="fname" id="fname" value={userData.fname} placeholder={userData.fname} disabled></input>}
            {userData.isEditingProfile && <input type="text" name="fname" id="fname" value="" placeholder={userData.fname}></input>}
            
            {!userData.isEditingProfile && <input type="text" name="lname" id="lname" value={userData.lname} placeholder={userData.lname} disabled></input>}
            {userData.isEditingProfile && <input type="text" name="lname" id="lname" value="" placeholder={userData.lname}></input>}
            
            <label id="bio_label" for="bio">About</label>
            {!userData.isEditingProfile && <textarea name="bio" id="bio" placeholder={userData.bio} disabled>{userData.bio}</textarea>}
            {userData.isEditingProfile && <textarea name="bio" id="bio" placeholder={userData.bio}></textarea>}
            
            {userData.isEditingProfile && <label for="password" id="password_label">Password:</label>}
            {userData.isEditingProfile && <input type="password" name="password" id="password" placeholder="********"></input>}
            
            <label id="attachments_label">Attachments</label>
            {userData.isEditingProfile && <input type="submit" id="save_changes" value="Save Changes"></input>}
        </form>
        {/*---------------------------------------------------------------*/}
        
        {/*--Changes whether the edit profile button exists or not--*/}
        {!userData.editDisabled && !userData.isEditingProfile && <button type="button" onClick={turnOnProfileEdits} id="edit_profile_button">Edit Profile</button>}
        {userData.editDisabled && userData.isEditingProfile && <button type="button" onClick={turnOnProfileEdits} id="edit_profile_button">TEST</button>}
        {/*---------------------------------------------------------*/}

        {/*--Render the profile picture--*/}
        {!userData.isEditingProfile && <img src={userData.profilePicture} id="profile_picture"></img>}
        {userData.isEditingProfile && <img src={userData.profilePicture} id="profile_picture" style={{opacity : 0.5}}></img>}
        {/*------------------------------*/}

        {/*--Render attachment 1--*/}
        {!userData.isEditingProfile && userData.attachment1 == null && <p id="attachment_1">No File Attached</p>}
        {!userData.isEditingProfile && userData.attachment1 != null && <a href={userData.attachment1.file} id="attachment_1" target="_blank">{userData.attachment1.name}</a>}

        {userData.isEditingProfile && userData.attachment1 == null && <p style={{opacity : 0.5}} id="attachment_1">No File Attached</p>}
        {userData.isEditingProfile && userData.attachment1 != null && <a style={{opacity : 0.5}} href={userData.attachment1.file} id="attachment_1" target="_blank">{userData.attachment1.name}</a>}
        {/*-----------------------*/}

        {/*--Render attachment 2--*/}
        {!userData.isEditingProfile && userData.attachment2 == null && <p id="attachment_2">No File Attached</p>}
        {!userData.isEditingProfile && userData.attachment2 != null && <a href={userData.attachment2.file} id="attachment_2" target="_blank">{userData.attachment2.name}</a>}
        
        {userData.isEditingProfile && userData.attachment2 == null && <p style={{opacity : 0.5}} id="attachment_2">No File Attached</p>}
        {userData.isEditingProfile && userData.attachment2 != null && <a style={{opacity : 0.5}} href={userData.attachment2.file} id="attachment_2" target="_blank">{userData.attachment2.name}</a>}
        {/*-----------------------*/}

        {/*--Render attachment 3--*/}
        {!userData.isEditingProfile && userData.attachment3 == null && <p id="attachment_3">No File Attached</p>}
        {!userData.isEditingProfile && userData.attachment3 != null && <a href={userData.attachment3.file} id="attachment_3" target="_blank">{userData.attachment3.name}</a>}

        {userData.isEditingProfile && userData.attachment3 == null && <p style={{opacity : 0.5}} id="attachment_3">No File Attached</p>}
        {userData.isEditingProfile && userData.attachment3 != null && <a style={{opacity : 0.5}} href={userData.attachment3.file} id="attachment_3" target="_blank">{userData.attachment3.name}</a>}    
        {/*-----------------------*/}

        {/*--Back button (go to homepage)--*/}
        <form action="/home" method="GET">
          <input type="submit" id="back_button" value="Back"></input>
        </form>
        {/*--------------------------------*/}

        {/*--Render the following if the user is editing their profile--*/}
        {userData.isEditingProfile && (
          <>
            <input type="file" accept="image/png" onChange={changePFP} id="pfp_input_btn" name="pfp_input_btn"></input>
            <input type="file" accept="application/pdf" onChange={changeAttach1} id="attach_input_1" name="attach_input_1"></input>
            <input type="file" accept="application/pdf" onChange={changeAttach2} id="attach_input_2" name="attach_input_2"></input>
            <input type="file" accept="application/pdf" onChange={changeAttach3} id="attach_input_3" name="attach_input_3"></input>
            
            <form action={userData.deleteAccLink}>
              <button id="delete_button" type="submit">Delete Account</button>
            </form>

            {/*--Renders error messages--*/}
            {userData.updateProfileErrorMessage == "ERROR_MESSAGE" && <p id="error_message" style="color:red;" hidden>Unable to save changes. Please check your information and try again.</p>}
            {userData.updateProfileErrorMessage == "SOMETHING_WENT_WRONG_MESSAGE" && <p id="something_went_wrong_message" style="color:red;" hidden>An error occurred. Please try again.</p>}
            {userData.updateProfileErrorMessage == "PFP_ERROR_MESSAGE" && <p id="pfp_error_message" style="color:red;" hidden>Only PNG files are allowed.</p>}
            {userData.updateProfileErrorMessage == "PFP_TOO_LARGE" && <p id="pfp_too_large" style="color:red;" hidden>Only PNGs up to 16MB are accepted.</p>}
            {userData.updateProfileErrorMessage == "ATTACHMENT_ERROR_MESSAGE" && <p id="attachment_error_message" style="color:red;" hidden>Only PDF files are allowed.</p>}
            {userData.updateProfileErrorMessage == "ATTACHMENT_TOO_LARGE" && <p id="attachment_too_large" style="color:red;" hidden>Only PDFs up to 16MB are accepted.</p>}
            {/*--------------------------*/}
          </>
        )}
        {/*-------------------------------------------------------------*/}
      </>
    )
    //------------------ 
  }
}

export default Profile //When a file imports this without a named export, export Profile() by default