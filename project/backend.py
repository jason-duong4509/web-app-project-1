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
"""
from flask import Flask, request, jsonify, render_template, send_file, session, url_for

"""
Import LoginManager to help with handling log in functionality.
Import login_required to prevent unauthorized users from accessing certain parts of the web application.
Import login_user to allow flask login to keep track of user logins.
Import logout_user to allow flask login to handle user logouts.
Import current_user to allow flask login to keep track of the current user
"""
from flask_login import LoginManager, login_required, login_user, logout_user, current_user

"""
Used to connect to the database.
"""
import psycopg2

"""
Used to treat byte data as a file.
"""
import io

"""
Used to detect the MIME type of a file by reading its contents
"""
import magic

"""
Used in the context of Render. Allows this file to connect to the database via a URL and a secret key.
"""
import os

"""
Import the User class so that User objects can be made.
"""
from User import User

"""
Gets the database URL from Render's environmental variable named DATABASE_URL (configured in the Render website).
Also gets the secret key used for Flask's sessions
"""
DATABASE_URL = os.environ.get("DATABASE_URL")
SECRET_KEY = os.environ.get("SECRET_KEY")

"""
Create a Flask instance of the current file.
__name__ denotes the current file, value varies by whether this file is imported or ran directly.
"""
webApp = Flask(__name__)
webApp.secret_key = SECRET_KEY # Sets the secret key for flask to the one stored on Render

"""
Creates a LoginManager instance and initializes it.
"""
login_manager = LoginManager()
login_manager.init_app(webApp)
login_manager.login_view = "signup" # Tells flask login where to redirect the user if they're not logged in and they attempted to access a restricted webpage

#--Flask-login functions--
@login_manager.user_loader
def load_user(user_id):
    user_id = f"{user_id}" # Converts it into a string in case it wasn't

    #--Check if the user_id is valid--
    connection_to_db = psycopg2.connect(DATABASE_URL)
    db_cursor = connection_to_db.cursor()

    db_cursor.execute("SELECT UserID FROM user_info")
    user_id_table = db_cursor.fetchall()
    db_cursor.close() # Teardown stuff
    connection_to_db.close() # Teardown stuff

    for entry in user_id_table: # user_id_table = [(UserID), ...]
        if entry[0] == int(user_id): # Found a matching entry
            return User(user_id)

    return None # Reaches here if user_id is not valid (not present in the database)
    #---------------------------------
#-------------------------

#--Connecting URLs to their corresponding function--
"""
Function that is called when the user accesses an invalid (does not exist) link.
"""
@webApp.errorhandler(404) # Accessing invalid links returns a HTTPS 404 error (page not found error)
def invalidLink(error_code):
    return render_template("error.html", error_message="Uh oh! The linked you visited is not valid.\nDouble check that you're using the right link.") # returns an error page to the user

"""
Function that is called when a 400 error code (invalid input) is sent to the front end
"""
@webApp.route("/400_Bad_Request", methods = ["GET"])
def get400WebPage():
    return render_template("error.html", error_message="400 Error. The server rejected the request due to malformed user input. Please try again.")

"""
Function that runs when the base webpage is accessed (the sign in page)
"""
@webApp.route("/", methods = ["GET"])
def signup():
    if current_user.is_authenticated: # If the user has already logged in
        return render_template("homepage.html")

    return render_template("sign_in.html")

"""
Function runs if the user clicks on the login page (webpage whose URL ends with "/login").
"""
@webApp.route("/login", methods = ["GET"])
def onLogin():
    if current_user.is_authenticated: # If the user has already logged in
        return render_template("homepage.html")
        
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
    # TODO: add validation checks (+ equals ignore case duplicates)
    # return jsonify({"success" : False}) # Input failed validation checks
    #-----------------------

    #--Create an account--
    connection_to_db = psycopg2.connect(DATABASE_URL)
    db_cursor = connection_to_db.cursor()
    # TODO: hash password before adding user data to database
    
    db_cursor.execute("SELECT PFP_File_Name, PFP_Byte_Data, PFP_MIME_Type FROM default_data")
    default_pfp = db_cursor.fetchall() # default_pfp = [(PFP_File_Name, PFP_Byte_Data, PFP_MIME_Type)]
    default_pfp_name = default_pfp[0][0]
    default_pfp_byte_data = bytes(default_pfp[0][1]) # Must convert into bytes since psycopg2 retrieves the byte data as an object for speed (convert object into byte data)
    default_pfp_mime_type = default_pfp[0][2]

    db_cursor.execute(f"INSERT INTO user_info (FirstName, LastName, Username, UserPassword) VALUES ('{fname}', '{lname}', '{username}', '{password}')") # Insert user data
    db_cursor.execute("INSERT INTO profile_info (Bio, ProfilePictureFileName, ProfilePictureByteData, ProfilePictureMIMEType, Attachment1FileName, Attachment1ByteData, Attachment1MIMEType, Attachment2FileName, Attachment2ByteData, Attachment2MIMEType, Attachment3FileName, Attachment3ByteData, Attachment3MIMEType) VALUES ('Hi! I''m a new user.', %s, %s, %s, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)", (default_pfp_name, default_pfp_byte_data, default_pfp_mime_type)) # Insert user data
    connection_to_db.commit() # Saves the changes

    #----Find the newly added user's UserID and log them in using it----
    db_cursor.execute("SELECT Username, UserID FROM user_info")
    user_data_table = db_cursor.fetchall()
    db_cursor.close()
    connection_to_db.close()

    for entry in user_data_table: # user_data_table = [(Username, UserID), ...]
        if entry[0] == username: # User is found
            login_user(load_user(entry[1])) # Log the user in using flask login 
    #-------------------------------------------------------------------

    return jsonify({
        "success" : True, 
        "url" : url_for("displayHomepage") # Gives the front end the URL it needs to change to
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
    return jsonify({"url" : url_for("signup")})

"""
Function runs when the user attempts to save the changes made to their profile.
"""
@webApp.route("/p/edit/save", methods = ["POST"])
@login_required
def saveProfileChanges():
    #--Input checks--
    try:
        user_is_editing_wrong_profile = int(current_user.id) != int(request.form["user_id"]) # Current user ID does not match the user ID of the profile being changed

        #--Get the user's submitted changes--
        new_username = request.form["username"]
        new_fname = request.form["fname"]
        new_lname = request.form["lname"]
        new_bio = request.form["bio"]
        new_pass = request.form["password"]
        #------------------------------------

        #TODO: do input checks on form elements
        #TODO: ^ if length 0 is ok, if length is smaller than db requirements but not 0 not ok

        if user_is_editing_wrong_profile:
            raise Exception
    except:
        return jsonify({"success" : False}), 400 #Backend rejects input
    #----------------
    
    connection_to_db = psycopg2.connect(DATABASE_URL)
    db_cursor = connection_to_db.cursor()

    #--Update username--
    if len(new_username) > 0: # User typed something in (blank = no change)
        db_cursor.execute("SELECT UserID, Username FROM user_info")
        username_table = db_cursor.fetchall()

        for entry in username_table: # username_table = [(UserID, Username), ...]
            user_in_table = entry[1]
            id_in_table = entry[0]

            usernames_match = user_in_table.lower() == new_username.lower()
            ids_dont_match = int(id_in_table) != int(current_user.id)

            if usernames_match and ids_dont_match: # Username is already taken
                return jsonify({"success" : False}) # Reject input

        db_cursor.execute("UPDATE user_info SET Username = %s WHERE UserID = %s", (new_username, current_user.id)) # Change the username
    #-------------------

    #--Update password--
    if len(new_pass) > 0: # User typed something in (blank = no change)
        #TODO: HASH THE PASSWORD V
        #new_pass = code to hash

        db_cursor.execute("UPDATE user_info SET UserPassword = %s WHERE UserID = %s", (new_pass, current_user.id)) # Change the password
    #-------------------

    #--Update bio--
    if len(new_bio) > 0: # User typed something in (blank = no change)
        db_cursor.execute("UPDATE profile_info SET Bio = %s WHERE UserID = %s", (new_bio, current_user.id)) # Change the bio
    #--------------

    #--Update Fname--
    if len(new_fname) > 0: # User typed something in (blank = no change)
        db_cursor.execute("UPDATE user_info SET FirstName = %s WHERE UserID = %s", (new_fname, current_user.id)) # Change the fname
    #----------------

    #--Update Lname--
    if len(new_lname) > 0: # User typed something in (blank = no change)
        db_cursor.execute("UPDATE user_info SET LastName = %s WHERE UserID = %s", (new_lname, current_user.id)) # Change the fname
    #----------------

    connection_to_db.commit()
    db_cursor.close()
    connection_to_db.close()
    return jsonify({"success" : True})
    
"""
Searches the database for a given username and returns either the profile URL of the matching username or False to indicate the failure to find a user.
"""
@webApp.route("/search/<username>", methods = ["GET"])
@login_required
def searchForUser(username):
    #--Input checks--
    try:
        float(username) # Attempts to turn the given username into a float
        return jsonify({"success" : False}) # Failed input check (given a number as input)
    except:
        if (len(username) > 100 or len(username) <= 0):
            return jsonify({"success" : False}) # Failed input check (string length invalid)
    #----------------

    #--Check the database for requested user--
    connection_to_db = psycopg2.connect(DATABASE_URL)
    db_cursor = connection_to_db.cursor()
    
    db_cursor.execute("SELECT Username, UserID FROM user_info")
    user_data_table = db_cursor.fetchall()
    db_cursor.close()
    connection_to_db.close()

    for entry in user_data_table: # user_data_table = [(Username, UserID), ...]
        if username.lower() == entry[0].lower(): # Found an entry (considers upper/lower case)
            return jsonify({
                "success" : True,
                "url" : url_for("onViewProfile", user_id = entry[1]) # Returns profile URL of the found username
                })
    #-----------------------------------------

    return jsonify({"success" : False}) # Did not find specified username

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
        return jsonify({"success" : False}) # Return a status message in JSON format
    #--------------------------------------------------------------------------

    #--Checks the database to see if any match the login form--
    connection_to_db = psycopg2.connect(DATABASE_URL)
    db_cursor = connection_to_db.cursor()
    db_cursor.execute("SELECT UserID, Username, UserPassword FROM user_info")
    user_pass_table = db_cursor.fetchall()
    db_cursor.close()
    connection_to_db.close()

    for entry in user_pass_table: # user_pass_table = [(UserID, Username, UserPassword), ...]
        if username.lower() == entry[1].lower() and password == entry[2]: # Found an entry that matches the user's input
            login_user(load_user(entry[0])) # Log the user in using flask login 
            return jsonify({"success" : True, "url" : url_for("displayHomepage")}) # Bring the user to the homepage after successful log in
    #----------------------------------------------------------

    #--Return a status message in JSON format--
    return jsonify({"success" : False})
    #------------------------------------------

"""
Function is ran when the user wants to view their own profile.
"""
@webApp.route("/p/own", methods = ["GET"])
@login_required
def onViewOwnProfile():
    return jsonify({"url" : url_for("onViewProfile", user_id = current_user.id)})

"""
Function that returns information about a given user (through their UserID).
"""
@webApp.route("/p/<user_id>", methods = ["GET"])
@login_required
def onViewProfile(user_id): # Takes whatever is after "/p/" and passes it as a param as user_id
    #--Check if user_id is a number--
    try:
        user_id = int(user_id) # Converts the user_id parameter into an integer to allow comparison with entries in the database
    except:
        return render_template("error.html", error_message = "Uh oh! The linked you visited is not valid.\nDouble check that you're using the right link.") # returns an error page to the user
    #--------------------------------

    #--Setup--
    connection_to_db = psycopg2.connect(DATABASE_URL) # Connect to the DB
    db_cursor = connection_to_db.cursor() # Gets the cursor of the DB so that we can pass commands to the DB
    username = fname = lname = bio = None
    #---------

    #--Gets relevant info about user_id from user_info--
    db_cursor.execute("SELECT * FROM user_info") # Gets the entire table from the DB
    user_info_table = db_cursor.fetchall() # Stores the result of the DB query (result in form of list of tuples)
    for entry in user_info_table: # user_info_table = [(UserID, Firstname, Lastname, Username, UserPassword), ...]
        if entry[0] == user_id: # Found the desired user
            fname = entry[1] # Grab the first name from the DB
            lname = entry[2] # Grab the last name from the DB
            username = entry[3] # Grab the username from the DB
            break
    #---------------------------------------------------

    #--Gets relevant info about user_id from profile_info--
    db_cursor.execute("SELECT * FROM profile_info") # Gets the entire table from the DB
    profile_info_table = db_cursor.fetchall() # Stores the result of the DB query (result in form of list of tuples)
    for entry in profile_info_table: # profile_info_table = [(UserID, Bio, ProfilePictureFileName, ProfilePictureByteData, ProfilePictureMIMEType, Attachment1FileName, Attachment1ByteData, Attachment1MIMEType, Attachment2FileName, Attachment2ByteData, Attachment2MIMEType, Attachment3FileName, Attachment3ByteData, Attachment3MIMEType), ...]
        if entry[0] == user_id: # Found the desired user
            bio = entry[1] # Grab the bio from the DB
            break
    #------------------------------------------------------

    db_cursor.close() # Teardown stuff
    connection_to_db.close() # Teardown stuff

    #--Check if user_id is valid input--
    if username == None: # user_id is not valid (user_id was not found in the DB)
        return render_template("error.html", error_message = "Uh oh! The linked you visited is not valid.\nDouble check that you're using the right link.") # returns an error page to the user
    #-----------------------------------
    
    return render_template("profile.html", user_id = user_id, current_user_id = current_user.id, username = username, fname = fname, lname = lname, bio = bio) # Return profile.html to the front end with all of the text placeholder values inserted into the file

"""
Function that returns the profile picture of a given user ID.
Intended use alongside /p/<user_id>.
"""
@webApp.route("/p/<user_id>/get_pfp", methods = ["GET"])
def getProfilePicture(user_id): # user_id = the user id in the URL when the request has been made
    #--Input check--
    try:
        #--Are the inputs integers?--
        user_id = int(user_id)
        #----------------------------

        #--Are the inputs valid integers?--
        user_id_is_invalid = user_id <= 1
        if user_id_is_invalid:
            raise Exception
        #----------------------------------
    except:
        return jsonify({"url" : url_for("get400WebPage")}), 400 # Returns error code 400 (invalid input)
    #---------------

    #--Connect to the database--
    connection_to_db = psycopg2.connect(DATABASE_URL)
    db_cursor = connection_to_db.cursor()
    #---------------------------

    #--Find the profile picture for user_id and return it--
    db_cursor.execute("SELECT UserID, ProfilePictureFileName, ProfilePictureByteData, ProfilePictureMIMEType FROM profile_info") # Gets pfp info from database
    results_table = db_cursor.fetchall()
    db_cursor.close()
    connection_to_db.close()
    for entry in results_table: # entry = (UserID, ProfilePictureFileName, ProfilePictureByteData, ProfilePictureMIMEType)
        if entry[0] == user_id: # Found the desired user
            return send_file(path_or_file=io.BytesIO(bytes(entry[2])), mimetype=entry[3], as_attachment=False)
    #------------------------------------------------------

    return jsonify({"url" : url_for("get400WebPage")}), 400 # Reaches here if user_id is not found in the DB. Returns error code 400 (invalid input)

"""
Function that returns the desired attachment of a given user ID.
Intended to be used alongisde /p/<userid>.
"""
@webApp.route("/p/<user_id>/get_attachment/<attachment_number>", methods = ["GET"])
@login_required
def getAttachment(user_id, attachment_number):
    #--Input check--
    try:
        #--Are the inputs integers?--
        user_id = int(user_id)
        attachment_number = int(attachment_number)
        #----------------------------

        #--Are the inputs valid integers?--
        attachment_number_is_invalid = attachment_number < 1 or attachment_number > 3
        user_id_is_invalid = user_id <= 1
        if attachment_number_is_invalid or user_id_is_invalid:
            raise Exception
        #----------------------------------
    except:
        return jsonify({"url" : url_for("get400WebPage")}), 400 # Returns error code 400 (invalid input)
    #---------------

    #--Connect to the DB--
    connection_to_db = psycopg2.connect(DATABASE_URL)
    db_cursor = connection_to_db.cursor()
    #---------------------

    #--Find the desired user and return the desired attachment--
    db_cursor.execute("SELECT * FROM profile_info") # Attachments are in profile_info
    profile_info_table = db_cursor.fetchall()

    for entry in profile_info_table: # profile_info_table = [(UserID, Bio, ProfilePictureFileName, ProfilePictureByteData, ProfilePictureMIMEType, Attachment1FileName, Attachment1ByteData, Attachment1MIMEType, Attachment2FileName, Attachment2ByteData, Attachment2MIMEType, Attachment3FileName, Attachment3ByteData, Attachment3MIMEType), ...]
        UserID = entry[0]
        if UserID == user_id: # Found the desired user
            if attachment_number == 1: # Front-end requested attachment 1
                attachment_1_mime_type = entry[7]
                if attachment_1_mime_type == None: # No attachment exists
                    return jsonify({"exists" : False}), 404 # Sends 404 error code (does not currently exist)
                attachment_1_byte_data = bytes(entry[6])
                return send_file(path_or_file=io.BytesIO(bytes(attachment_1_byte_data)), mimetype=attachment_1_mime_type, as_attachment=False)
            elif attachment_number == 2: # Front-end requested attachment 2
                attachment_2_mime_type = entry[10]
                if attachment_2_mime_type == None: # No attachment exists
                    return jsonify({"exists" : False}), 404 # Sends 404 error code (does not currently exist)
                attachment_2_byte_data = bytes(entry[9])
                return send_file(path_or_file=io.BytesIO(bytes(attachment_2_byte_data)), mimetype=attachment_2_mime_type, as_attachment=False)
            elif attachment_number == 3: # Front-end requested attachment 3
                attachment_3_mime_type = entry[13]
                if attachment_3_mime_type == None: # No attachment exists
                    return jsonify({"exists" : False}), 404 # Sends 404 error code (does not currently exist)
                attachment_3_byte_data = bytes(entry[12])
                return send_file(path_or_file=io.BytesIO(bytes(attachment_3_byte_data)), mimetype=attachment_3_mime_type, as_attachment=False)
    #-----------------------------------------------------------

    return jsonify({"url" : url_for("get400WebPage")}), 400 # Only reaches here if user_id did not match any in the DB. Returns error code 400 (invalid input)

"""
Function that attempts to change the user's profile picture
"""
@webApp.route("/p/<user_id>/submit_pfp", methods = ["POST"])
@login_required
def changePFP(user_id):
    try:
        user_id = int(user_id)
        user_is_editing_someones_profile = user_id != int(current_user.id) # UserID the user is editing is not their own

        new_pfp = request.files["newPFP"] # Gets the file sent from the user (contents are in binary)
        file_mime_type = magic.from_buffer(new_pfp.read(2048), mime=True) # Reads the first 2048 bytes (recommended amount) of the file and guess the MIME type
        mime_type_is_incorrect = not (file_mime_type == "image/png") # Checks if the file's MIME type is a PNG
        new_pfp.seek(0) # Move the pointer back to the beginning of the file
        new_pfp_bytes = new_pfp.read() # Read the file (in bytes) and store it

        #TODO: add file size check (too big = reject)

        if user_is_editing_someones_profile or mime_type_is_incorrect:
            raise Exception
    except:
        return jsonify({"success" : False}), 400 # Return 400 error code
    #---------------

    connection_to_db = psycopg2.connect(DATABASE_URL)
    db_cursor = connection_to_db.cursor()

    #--Update profile info for the user in the DB--
    new_pfp_file_name = "%i_profile_picture.png" % user_id
    db_cursor.execute("UPDATE profile_info SET ProfilePictureFileName = %s, ProfilePictureByteData = %s, ProfilePictureMIMEType = %s WHERE UserID = %s", (new_pfp_file_name, psycopg2.Binary(new_pfp_bytes), "image/png", user_id))
    connection_to_db.commit()
    #----------------------------------------------

    db_cursor.close()
    connection_to_db.close()

    return send_file(path_or_file=io.BytesIO(new_pfp_bytes), mimetype="image/png", as_attachment=False) # Send the new PFP back to the front end so it can display it to the user

"""
Function that attempts to change one of the user's given attachments
"""
@webApp.route("/p/<user_id>/change_attachment/<attachment_number>", methods = ["POST"])
@login_required
def changeAttachment(user_id, attachment_number):
    #--Input check--
    try:
        user_id = int(user_id)
        user_is_editing_someones_profile = user_id != int(current_user.id) # UserID the user is editing is not their own

        attachment_number = int(attachment_number)
        attachment_number_is_invalid = attachment_number > 3 or attachment_number < 1

        new_attachment = request.files["newAttach"] # Gets the file sent from the user (contents are in binary)
        file_mime_type = magic.from_buffer(new_attachment.read(2048), mime=True) # Reads the first 2048 bytes (recommended amount) of the file and guess the MIME type
        mime_type_is_incorrect = not (file_mime_type == "application/pdf") # Checks if the file's MIME type is a PNG
        new_attachment.seek(0) # Move the pointer back to the beginning of the file
        file_bytes = new_attachment.read() # Read the file (in bytes) and store it

        #TODO: add file size check (too big = reject)

        if user_is_editing_someones_profile or mime_type_is_incorrect or attachment_number_is_invalid:
            raise Exception
    except:
        return jsonify({"success" : False}), 400 # Return 400 error code
    #---------------

    connection_to_db = psycopg2.connect(DATABASE_URL)
    db_cursor = connection_to_db.cursor()

    #--Update profile info for the user in the DB--
    if attachment_number == 1: # Change attachment 1
        new_attach_file_name = "%i_attachment_1.pdf" % attachment_number
        db_cursor.execute("UPDATE profile_info SET Attachment1FileName = %s, Attachment1ByteData = %s, Attachment1MIMEType = %s WHERE UserID = %s", (new_attach_file_name, psycopg2.Binary(file_bytes), "application/pdf", user_id))
    elif attachment_number == 2: # Change attachment 2
        new_attach_file_name = "%i_attachment_2.pdf" % attachment_number
        db_cursor.execute("UPDATE profile_info SET Attachment2FileName = %s, Attachment2ByteData = %s, Attachment2MIMEType = %s WHERE UserID = %s", (new_attach_file_name, psycopg2.Binary(file_bytes), "application/pdf", user_id))
    elif attachment_number == 3: # Change attachment 3
        new_attach_file_name = "%i_attachment_3.pdf" % attachment_number
        db_cursor.execute("UPDATE profile_info SET Attachment3FileName = %s, Attachment3ByteData = %s, Attachment3MIMEType = %s WHERE UserID = %s", (new_attach_file_name, psycopg2.Binary(file_bytes), "application/pdf", user_id))
        
    connection_to_db.commit()
    #----------------------------------------------

    db_cursor.close()
    connection_to_db.close()

    return send_file(path_or_file=io.BytesIO(file_bytes), mimetype="application/pdf", as_attachment=False) # Send the new attachment back to the front end so it can display it to the user

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
