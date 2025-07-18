"""
Back-end code to connect the front-end portion of the web application to the database.
Written in Python using Flask for convenience.

Author: Jason Duong
"""

"""
Import the Flask framework so it can be used.
Import request to handle requests from the front-end.
Import jsonify so communications to the front-end are in the form of JSON.
- JSON is used as this uses the REST standard and JSON is commonly used.
Import render_template so that flask can grab and serve HTML files from /templates/file.html.
Import send_file so that flask can send user-related files (profile picture) to the front-end.
Import session so that flask can manage sessions.
Import url_for so that flask can dynamically generate URLs during runtime.
Import redirect so that flask can instruct the front-end to change URLs.
"""
from flask import Flask, request, jsonify, render_template, send_file, session, url_for, redirect

"""
Import LoginManager to help with handling log in functionality.
"""
from flask_login import LoginManager

"""
Used to connect to the database.
"""
import psycopg2

"""
Used to treat byte data as a file.
"""
import io

"""
Used in the context of Render. Allows this file to connect to the database via a URL and a secret key.
"""
import os

"""
Import the User class so that User objects can be made.
"""
from User import User

"""
Create a Flask instance of the current file.
__name__ denotes the current file, value varies by whether this file is imported or ran directly.
"""
webApp = Flask(__name__)

"""
Creates a LoginManager instance and initializes it.
"""
login_manager = LoginManager()
login_manager.init_app(webApp)

"""
Gets the database URL from Render's environmental variable named DATABASE_URL (configured in the Render website).
Also gets the secret key used for Flask's sessions
"""
DATABASE_URL = os.environ.get("DATABASE_URL")
SECRET_KEY = os.environ.get("SECRET_KEY")

#--Flask-login functions--
@login_manager.user_loader
def load_user(user_id):
    user_id = f"{user_id}" # Converts it into a string in case it wasn't
    
    #--Check if the user_id is valid--
    connection_to_db = psycopg2.connect(DATABASE_URL)
    db_cursor = connection_to_db.cursor()

    db_cursor.execute("SELECT UserID FROM user_info")
    user_id_table = db_cursor.fetchall()

    for id in user_id_table:
        if id == int(user_id): # Found a matching entry
            db_cursor.close() # Teardown stuff
            connection_to_db.close() # Teardown stuff
            return User(user_id)
    
    db_cursor.close() # Teardown stuff
    connection_to_db.close() # Teardown stuff
    return None # Reaches here if user_id is not valid (not present in the database)
    #---------------------------------
#-------------------------

#--Connecting URLs to their corresponding function--
"""
Function that runs when the base webpage is accessed (the sign in page)
"""
@webApp.route("/", methods = ["GET"])
def signup():
    return render_template("sign_in.html")

"""
Function runs if the user clicks on the login page (webpage whose URL ends with "/login").
"""
@webApp.route("/login", methods = ["GET"])
def onLogin():
    return render_template("login.html")

"""
Function that runs when the user attempts to create an account
"""
@webApp.route("/create_account", methods = ["POST"])
def createAccount():
    #--Gets the form inputs--
    username = request.form["username"] # Takes the value from the "username" key
    password = request.form["password"] # Takes the value from the "password" key
    fname = request.form["fname"] # Takes the value from the "fname" key
    lname = request.form["lname"] # Takes the value from the "lname" key
    #------------------------

    #--Validate the inputs--
    # TODO: add validation checks
    return jsonify({"success" : False}) # Input failed validation checks
    #-----------------------

    #--Create an account--
    connection_to_db = psycopg2.connect(DATABASE_URL)
    db_cursor = connection_to_db.cursor()
    # TODO: hash password before adding user data to database
    database_cursor.execute(f"INSERT INTO user_info (FirstName, LastName, Username, UserPassword) VALUES ('{fname}', '{lname}', '{username}', '{password}')") # Insert user data
    connection_to_db.commit() # Saves the changes
    
    db_cursor.close()
    connection_to_db.close()
    
    return jsonify({
        "success" : True, 
        "url" : redirect(url_for("/home")) # Tells the front end to redirect to the given url
        })
    #---------------------

"""
The default webpage after logging in
"""
@webApp.route("/home", methods = ["GET"])
@login_required
def displayHomepage():
    return render_template("homepage.html")

"""
"""
@webApp.route("/logout", methods = ["POST"])
@login_required
def onLogout():
    logout_user() # Logs the user out via flask login
    return render_template("sign_in.html")

"""
Function runs when the user attempts to save the changes made to their profile.
"""
@webApp.route("/p/<user_id>/save", methods = ["POST"])
def saveProfileChanges(user_id):
    #TODO: finish writing this

"""
Function runs when the user submits their log in form
"""
@webApp.route("/loginSubmit", methods = ["POST"])
def onLoginSubmit():
    #--Gets the submitted form details--
    username = request.form["username"] # Gets the sent input from the one named "username"
    password = request.form["password"] # Gets the sent input from the one named "password"
    #-----------------------------------

    #--Make some initial input checks to potentially save time reading the DB--
    if len(username) > 30 or len(username) <= 0 or len(password) > 200 or len(password) <= 0:
        return jsonify.({"success" : False}) # Return a status message in JSON format
    #--------------------------------------------------------------------------

    #--Checks the database to see if any match the login form--
    connection_to_db = psycopg2.connect(DATABASE_URL)
    db_cursor = connection_to_db.cursor()
    db_cursor.execute("SELECT UserID, Username, UserPassword FROM user_info")
    user_pass_table = db_cursor.fetchall()
    db_cursor.close()
    connection_to_db.close()

    for entry in user_pass_table: # user_pass_table = [(UserID, Username, UserPassword), ...]
        if username == entry[1] and password == entry[2]: # Found an entry that matches the user's input
            login_user(load_user(entry[0])) # Log the user in using flask login 
            return render_template("homepage.html") # Bring the user to the homepage after successful log in
    #----------------------------------------------------------

    #--Return a status message in JSON format--
    return jsonify.({"success" : False})
    #------------------------------------------

"""
Function is ran when the user wants to view their own profile
"""
@webApp.route("/p/own", methods = ["GET"])
@login_required
def onViewOwnProfile():
    onViewProfile(current_user.id) # Call the other view profile method and pass in the user's ID

"""
"""
@webApp.route("/p/<user_id>", methods = ["GET"])
def onViewProfile(user_id): # Takes whatever is after "/p/" and passes it as a param as user_id
    #--Setup--
    connection_to_db = psycopg2.connect(DATABASE_URL) # Connect to the DB
    db_cursor = connection_to_db.cursor() # Gets the cursor of the DB so that we can pass commands to the DB
    username = fname = lname = bio = None
    #---------

    #--Gets relevant info about user_id from user_info--
    db_cursor.execute("SELECT * FROM user_info") # Gets the entire table from the DB
    user_info_table = db_cursor.fetchall() # Stores the result of the DB query (result in form of list of tuples)
    for entry in user_info_table: # user_info_table = [(UserID, Firstname, Lastname, Username, UserPassword), ...]
        if entry[0] == user_id:
            fname = entry[1] # Grab the first name from the DB
            lname = entry[2] # Grab the last name from the DB
            username = entry[3] # Grab the username from the DB
            break
    #---------------------------------------------------

    #--Gets relevant info about user_id from profile_info--
    db_cursor.execute("SELECT * FROM profile_info") # Gets the entire table from the DB
    profile_info_table = db_cursor.fetchall() # Stores the result of the DB query (result in form of list of tuples)
    for entry in profile_info_table: # profile_info_table = [(UserID, Bio, ProfilePictureFileName, ProfilePictureByteData, ProfilePictureMIMEType, Attachment1FileName, Attachment1ByteData, Attachment1MIMEType, Attachment2FileName, Attachment2ByteData, Attachment2MIMEType, Attachment3FileName, Attachment3ByteData, Attachment3MIMEType), ...]
        if entry[0] == user_id:
            bio = entry[1] # Grab the bio from the DB
            break
    #------------------------------------------------------

    #--Check if user_id is valid input--
    if username == None: # user_id is not valid (user_id was not found in the DB)
        db_cursor.close() # Teardown stuff
        connection_to_db.close() # Teardown stuff
        return render_template("error.html", error_message = "Uh oh! The linked you visited is not valid.\nDouble check that you're using the right link.") # returns an error page to the user
    #-----------------------------------

    db_cursor.close() # Teardown stuff
    connection_to_db.close() # Teardown stuff
    return render_template("profile.html", username = username, fname = fname, lname = lname, bio = bio) # Return profile.html to the front end with all of the text placeholder values inserted into the file

"""
Function that returns the profile picture of a given user ID.
Intended use alongside /profile/<user_id>.
"""
@webApp.route("/profile/<user_id>/get_pfp", methods = ["GET"])
def getProfilePicture(user_id): # user_id = the user id in the URL when the request has been made
    #--Connect to the database--
    connection_to_db = psycopg2.connect(DATABASE_URL)
    db_cursor = connection_to_db.cursor()
    #---------------------------

    #--Find the profile picture for user_id and return it--
    db_cursor.execute("SELECT UserID, ProfilePictureFileName, ProfilePictureByteData, ProfilePictureMIMEType FROM profile_info") # Gets pfp info from database
    results_table = db_cursor.fetchall()
    for entry in results_table: # entry = (UserID, ProfilePictureFileName, ProfilePictureByteData, ProfilePictureMIMEType FROM profile_info)
        if entry[0] == user_id:
            db_cursor.close()
            connection_to_db.close()
            return send_file(path_or_file=io.BytesIO(entry[2]), mimetype=entry[3], as_attachment=False)
    #------------------------------------------------------

    #--user_id is not valid--
    db_cursor.close()
    connection_to_db.close()
    return render_template("error.html", error_message = "Uh oh! The linked you visited is not valid.\nDouble check that you're using the right link.") # returns an error page to the user
    #------------------------

"""    
"""
"""
@webApp.route("/signup", methods = ["GET"])
def onSignup():
    # TODO: this

"""
# Function runs when the front-end JS sends a POST request to the database (to update the DB with information).
"""
@webApp.route("/create_user", methods = ["POST"])
def createUser():
    # TODO: add functionality for when the user wants to make an account. store it to the DB

"""
# Function runs when the front-end JS sends a POST request to the database (to update the DB with information).
"""
@webApp.route("/delete_user", methods = ["POST"])
def deleteUser():
    # TODO: add functionality for when the user wants to delete their account. delete it from the DB
"""
#---------------------------------------------------
