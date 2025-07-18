document.getElementById("logout_button").addEventListener("click", event =>{
    event.preventDefault(); 
    const request = fetch("/logout", method = POST); //Call backend to log the user out
});

document.getElementById("view_profile_button").addEventListener("click", event =>{
    event.preventDefault();
    const request = fetch("/p/own", method = GET); //Call backend to display the user's own profile
});