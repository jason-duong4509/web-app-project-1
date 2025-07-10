/* 
   File that is used to configure a database on Render
   Written to support PostgreSQL formatting (PostgreSQL is used on Render)
   
   Author: Jason Duong
*/

--Create a table for the basic user information--
CREATE TABLE user_info(
    UserID SERIAL PRIMARY KEY, --When an entry is created, a UserID is generated. The ID must be unique (handled in PRIMARY KEY)

    FirstName VARCHAR(255) NOT NULL, --Can never be NULL
    CHECK (char_length(FirstName) > 0), --Ensures that a name is entered

    LastName VARCHAR(255) NOT NULL, --Can never be NULL 
    CHECK (char_length(LastName) > 0), --Ensures that a name is entered

    Username VARCHAR(255) UNIQUE NOT NULL, --Username must be unique and not NULL
    CHECK (char_length(Username) >= 5 and char_length(Username) <= 10), --Ensures that usernames are of a certain length

    UserPassword VARCHAR(255) NOT NULL, --TODO: add password hashing? constraints on pass to prevent injection attacks? maybe not since you only need to check if two passwords match and nothing more 
    CHECK (char_length(UserPassword) >= 5) -- Ensures that passwords are of a certain length
);
-------------------------------------------------

--Create a table for the user's profile information--
CREATE TABLE profile_info(
    UserID SERIAL PRIMARY KEY, --When an entry is created, a UserID is generated. The ID must be unique (handled in PRIMARY KEY)
    Bio VARCHAR(255), --NULL represents no set bio

    ProfilePictureFileName TEXT, --File name
    ProfilePictureByteData BYTEA, --File itself in binary

    Attachment1FileName TEXT, --File name
    Attachment1ByteData BYTEA, --File itself in binary

    Attachment2FileName TEXT, --File name
    Attachment2ByteData BYTEA, --File itself in binary

    Attachment3FileName TEXT, --File name
    Attachment3ByteData BYTEA --File itself in binary
);
-----------------------------------------------------