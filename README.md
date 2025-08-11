# Peeps Finder
## Overview
Peeps Finder is a web-application that provides users the ability to share information about themselves and discover other users on the platform through profiles.

The primary purpose behind this web application is to learn the technical details involved in creating a full-stack website.

## Usage
This project is used in the following link: https://web-app-project-1.onrender.com/

This project is not intended for local use.

## Deployment
Peeps Finder is deployed online through [Render](https://render.com/). Render handles the physical hardware required for deploying a web-application.

## Dependencies
Found in `project/requirements.txt`, the frameworks/libraries used are as follows:

### Flask
The core framework involved in creating the back-end of the project. Provides many useful features such as HTML templates (through Jinja2), routing the front-end to the back-end, and more.

### Psycopg2
A PostgreSQL adapter. Allows the back-end to connect and interact with the database.

### Flask-Login
An extension of Flask. Provides features that track user's sessions and manage user authentication (login, logout, restricted access).

### Flask-Limiter
An extension of Flask. Delivers features that limit the rate at which an IP address can make requests to the application. Provides the web-application greater resistance to DOS attacks.

### Python-Magic
Used to identify file MIME types by analyzing their byte data.

### Bcrypt
A function used to hash passwords. Ensures passwords are not handled nor stored in plaintext.


