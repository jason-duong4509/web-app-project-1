document.getElementById("edit_profile_button").addEventListener("click", event =>{
    event.preventDefault(); //Stops the event (clicking the button) from triggering its default behavior 
    
    //--Switches the buttons around--
    document.getElementById("edit_profile_button").hidden = true; //Makes this button hidden
    document.getElementById("edit_profile_button").disabled = true; //Disables this button (prevents accidental clicks)
    document.getElementById("save_changes").hidden = false; //Makes the save changes button visible
    document.getElementById("save_changes").disabled = false; //Enables the save changes button 
    //-------------------------------

    //--Enables each profile attribute so that they can be edited--
    document.getElementById("username").disabled = false;
    document.getElementById("fname").disabled = false;
    document.getElementById("lname").disabled = false;
    document.getElementById("bio").disabled = false;
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
    const result = await fetch()
    //-----------------

    //--Switches the buttons around--
    document.getElementById("save_changes").hidden = true; //Makes this button hidden
    document.getElementById("save_changes").disabled = true; //Disables this button (prevents accidental clicks)
    document.getElementById("edit_profile_button").hidden = false; //Makes the edit profile button visible
    document.getElementById("edit_profile_button").disabled = false; //Enables the edit profile button 
    //-------------------------------

    //--Disables each profile attribute so that they cannot be edited--
    document.getElementById("username").disabled = false;
    document.getElementById("fname").disabled = false;
    document.getElementById("lname").disabled = false;
    document.getElementById("bio").disabled = false;
    //-----------------------------------------------------------------
});