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
"""
from flask import Flask, request, jsonify

"""
Used to connect to the database.
"""
import psycopg2

"""
Used in the context of Render. Allows this file to connect to the database via a URL.
"""
import os

"""
Create a Flask instance of the current file.
__name__ denotes the current file, value varies by whether this file is imported or ran directly.
"""
webApp = Flask(__name__)

# TODO: get the url once database is created
# DATABASE_URL = os.environ.get(INSERT DATABASE LINK HERE)

#--Connecting URLs to their corresponding function--
"""
Function runs if the user clicks on the login page (webpage whose URL ends with "/login").
"""
@webApp.route("/login", methods = ["GET"])
def onLogin():
    # TODO: return the login webpage from the DB

"""
"""
@webApp.route("/p/<user_id>", methods = ["GET"])
def onViewProfile(user_id): # Takes whatever is after "/p/" and passes it as a param as user_id
    #--Setup--
    connection_to_db = psycopg2.connect(INSERT STUFF HERE) # Connect to the DB
    db_cursor = connection_to_db.cursor() # Gets the cursor of the DB so that we can pass commands to the DB
    username = fname = lname = bio = pfp = attachment1 = attachment2 = attachment3 = None
    #---------

    #--Gets relevant info about user_id from user_info--
    db_cursor.execute("SELECT * FROM user_info") # Gets the entire table from the DB
    user_info_table = db_cursor.fetchall() # Stores the result of the DB query (result in form of list of tuples)
    for entry in user_info_table: # user_info_table = [(UserID, Firstname, Lastname, Username, UserPassword), ...]
        if entry[0] == user_id:
            fname = entry[1]
            lname = entry[2]
            username = entry[3]
            break
    #---------------------------------------------------

    #--Gets relevant info about user_id from profile_info--
    db_cursor.execute("SELECT * FROM profile_info") # Gets the entire table from the DB
    profile_info_table = db_cursor.fetchall() # Stores the result of the DB query (result in form of list of tuples)
    for entry in profile_info_table: # profile_info_table = [(UserID, Bio, ProfilePictureFileName, ProfilePictureByteData, Attachment1FileName, Attachment1ByteData, Attachment2FileName, Attachment2ByteData, Attachment3FileName, Attachment3ByteData), ...]
        if entry[0] == user_id:
            bio = entry[1]
            pfp = entry[3]
            attachment1 = entry[5]
            attachment2 = entry[7]
            attachment3 = entry[9]
            break
    #------------------------------------------------------

    #--Check if user_id is valid input--
    if username == None: # user_id is not valid (user_id was not found in the DB)
        return render_template("error.html", error_message = "Uh oh! The linked you visited is not valid.\nDouble check that you're using the right link.") # returns an error page to the user
    #-----------------------------------

    return render_template(
                            "profile.html", 
                            username = username, 
                            fname = fname, 
                            lname = lname, 
                            bio = bio, 
                            pfp = pfp, 
                            attachment1 = attachment1, 
                            attachment2 = attachment2, 
                            attachment3 = attachment3
                            ) # Return profile.html to the front end with all of the placeholder values inserted into the file
    
"""
"""
@webApp.route("/signup", methods = ["GET"])
def onSignup():
    # TODO: this

"""
Function runs when the front-end JS sends a POST request to the database (to update the DB with information).
"""
@webApp.route("/create_user", methods = ["POST"])
def createUser():
    # TODO: add functionality for when the user wants to make an account. store it to the DB

"""
Function runs when the front-end JS sends a POST request to the database (to update the DB with information).
"""
@webApp.route("/delete_user", methods = ["POST"])
def deleteUser():
    # TODO: add functionality for when the user wants to delete their account. delete it from the DB

#---------------------------------------------------
