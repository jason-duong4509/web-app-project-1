"""
Import flask login's UserMixin to use its predefined methods.
"""
from flask_login import UserMixin

"""
link to doc
https://flask-login.readthedocs.io/en/latest/#
"""

class User(UserMixin): # Inherits UserMixin methods and attributes so that they can be used
    def __init__(self, ): # Constructor