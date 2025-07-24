"""
When this file runs, connects to the Postgre database on Render and configures it

Author: Jason Duong
"""

import psycopg2 # Needed to connect to the database

#--Set up and connect to DB--
DATABASE_URL = "INSERT DATABASE URL" # Placeholder for when running the file locally during database set up
connection_to_db = psycopg2.connect(DATABASE_URL)
database_cursor = connection_to_db.cursor()
#----------------------------

database_cursor.execute(open("database_configurations.sql", "r").read()) # Read the configurations file and send it as a command to the DB to execute

#--Verify that configuration is successful by printing the DB's contents--
database_cursor.execute("INSERT INTO user_info (FirstName, LastName, Username, UserPassword) VALUES ('bob', 'bobbob', 'bobobobob', '123456')") # Insert test data
database_cursor.execute("SELECT * FROM user_info")
print(database_cursor.fetchall())

#----Prepare the default data that will be inserted into the DB----
default_pfp_name = "default_image.png"
default_pfp_byte_data = open("default_image.png", "rb").read() # Open the image in read byte mode and read its contents
default_pfp_mime_type = "image/png" # The MIME type of the image
#------------------------------------------------------------------

database_cursor.execute("INSERT INTO default_data (PFP_File_Name, PFP_Byte_Data, PFP_MIME_Type) VALUES (%s, %s, %s)", (default_pfp_name, default_pfp_byte_data, default_pfp_mime_type))
database_cursor.execute("SELECT * FROM default_data")
print(database_cursor.fetchall())
database_cursor.execute("INSERT INTO profile_info (Bio, ProfilePictureFileName, ProfilePictureByteData, ProfilePictureMIMEType, Attachment1FileName, Attachment1ByteData, Attachment1MIMEType, Attachment2FileName, Attachment2ByteData, Attachment2MIMEType, Attachment3FileName, Attachment3ByteData, Attachment3MIMEType) VALUES ('Hi! I''m a new user.', %s, %s, %s, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)", (default_pfp_name, default_pfp_byte_data, default_pfp_mime_type)) # Insert test data
database_cursor.execute("SELECT * FROM profile_info")
print(database_cursor.fetchall())
#-------------------------------------------------------------------------

connection_to_db.commit() # Commit the changes above
database_cursor.close() # Teardown stuff
connection_to_db.close() # Teardown stuff