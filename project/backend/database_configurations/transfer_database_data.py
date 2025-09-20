"""
When this file runs, connects to a Postgre database on Render and transfers its data to another database.

Author: Jason Duong
"""

import psycopg2 # Needed to connect to the database

#--Set up and connect to DB--
FROM_DATABASE_URL = "INSERT DATABASE URL" # Placeholder for when running the file locally during database set up
TO_DATABASE_URL = "INSERT DATABASE URL" # Placeholder for when running the file locally during database set up
connection_to_db = psycopg2.connect(FROM_DATABASE_URL)
database_cursor = connection_to_db.cursor()
#----------------------------

#--Grab the information from current database--
database_cursor.execute("SELECT * FROM user_info")
user_info_table = database_cursor.fetchall()
database_cursor.execute("SELECT * FROM profile_info")
profile_info_table = database_cursor.fetchall()
database_cursor.execute("SELECT * FROM default_data")
default_data_table = database_cursor.fetchall()
database_cursor.close()
connection_to_db.close()
#----------------------------------------------

#--Set up the other database with necessary tables before transferring data--
connection_to_db = psycopg2.connect(TO_DATABASE_URL)
database_cursor = connection_to_db.cursor()
database_cursor.execute(open("database_configurations.sql", "r").read()) # Read the configurations file and send it as a command to the DB to execute

#----Print DB contents to verify success----
print("----TO database initialized contents----")
database_cursor.execute("SELECT * FROM user_info")
print(database_cursor.fetchall())
database_cursor.execute("SELECT * FROM default_data")
print(database_cursor.fetchall())
database_cursor.execute("SELECT * FROM profile_info")
print(database_cursor.fetchall())
print("----------------------------------------\n")
#-------------------------------------------
#----------------------------------------------------------------------------

#--Transfer data to the other database--
for entry in user_info_table:
    database_cursor.execute("INSERT INTO user_info (FirstName, LastName, Username, UserPassword) VALUES (%s, %s, %s, %s)", (entry[1], entry[2], entry[3], entry[4]))

for entry in profile_info_table:
    database_cursor.execute("INSERT INTO profile_info (Bio, ProfilePictureFileName, ProfilePictureByteData, ProfilePictureMIMEType, Attachment1FileName, Attachment1ByteData, Attachment1MIMEType, Attachment2FileName, Attachment2ByteData, Attachment2MIMEType, Attachment3FileName, Attachment3ByteData, Attachment3MIMEType) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", (entry[1], entry[2], entry[3], entry[4], entry[5], entry[6], entry[7], entry[8], entry[9], entry[10], entry[11], entry[12], entry[13]))

for entry in default_data_table:
    database_cursor.execute("INSERT INTO default_data (PFP_File_Name, PFP_Byte_Data, PFP_MIME_Type) VALUES (%s, %s, %s)", (entry[0], entry[1], entry[2]))
#---------------------------------------

#----Print DB contents to verify success----
print("----FROM database initialized contents----")
database_cursor.execute("SELECT * FROM user_info")
print(database_cursor.fetchall())
print("\n")
database_cursor.execute("SELECT * FROM default_data")
print(database_cursor.fetchall())
print("\n")
database_cursor.execute("SELECT * FROM profile_info")
print(database_cursor.fetchall())
print("------------------------------------------\n")
#-------------------------------------------

connection_to_db.commit() # Commit the changes above
database_cursor.close() # Teardown stuff
connection_to_db.close() # Teardown stuff