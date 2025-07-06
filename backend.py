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

webApp = Flask(__name__) # Create a Flask object (setup)

# TODO: get the url once database is created
# DATABASE_URL = os.environ.get(INSERT DATABASE LINK HERE)

#--Connecting URLs to their corresponding function--
"""
Function runs if the user clicks on the login page (webpage whose URL ends with "/login").
"""
@app.route("/login", methods = ["GET"])
def onLogin():
    # TODO: return the login webpage from the DB

"""
Function runs when the front-end JS sends a POST request to the database (to update the DB with information).
"""
@app.route("/create_user", methods = ["POST"])
def createUser():
    # TODO: add functionality for when the user wants to make an account. store it to the DB

"""
Function runs when the front-end JS sends a POST request to the database (to update the DB with information).
"""
@app.route("/delete_user", methods = ["POST"])
def deleteUser():
    # TODO: add functionality for when the user wants to delete their account. delete it from the DB

#---------------------------------------------------
