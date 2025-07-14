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
"""
from flask import Flask, request, jsonify, render_template, send_file

"""
Used to connect to the database.
"""
import psycopg2

"""
Used to treat byte data as a file.
"""
import io

"""
Used in the context of Render. Allows this file to connect to the database via a URL.
"""
import os

"""
Create a Flask instance of the current file.
__name__ denotes the current file, value varies by whether this file is imported or ran directly.
"""
webApp = Flask(__name__)

"""
Gets the database URL from Render's environmental variable named DATABASE_URL (configured in the Render website).
"""
DATABASE_URL = os.environ.get("DATABASE_URL")

#--Connecting URLs to their corresponding function--
"""
Function runs if the user clicks on the login page (webpage whose URL ends with "/login").
"""
@webApp.route("/login", methods = ["GET"])
def onLogin():
    return render_template("login.html")

"""
Function runs when the user attempts to save the changes made to their profile.
"""
@webApp.route("/p/<user_id>/save", methods = ["POST"])
def saveProfileChanges(user_id):
    #TODO: finish writing this

"""
"""
@webApp.route("/loginSubmit", methods = ["POST"])
def onLoginSubmit():
    username = request.form["username"] # Gets the sent input from the one named "username"
    password = request.form["password"] # Gets the sent input from the one named "password"
    return render_template("error.html", error_message=f"username = {username}, password = {password}") # TODO: delete and replace with proper html file. testing purposes for now

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
