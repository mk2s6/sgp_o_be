@ECHO OFF

REM Create sql file to cleanup/recreate DB and users
REM First line has single > because we want to overwrite existing file.
REM Other has >> because they are just appending it.
ECHO DROP DATABASE IF EXISTS hms; > %TEMP%\recreate_hms_db.sql
ECHO CREATE DATABASE hms DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci; >> %TEMP%\recreate_hms_db.sql

ECHO "Creating New Database..."
mysql -u root -p < %TEMP%\recreate_hms_db.sql
DEL /F /Q %TEMP%\recreate_hms_db.sql

ECHO "Importing Schema by running migrations..."
cd ../../
call db-migrate up
call db-migrate up:data
call db-migrate up:tests
REM To go to folder where we were earlier
cd tools/scripts

REM ECHO "Importing Schema..."
REM mysql -u root -p hms < ..\..\tools\db_schema\hms-schema.sql

REM ECHO "Importing Test Data..."
REM mysql -u root -p hms < ..\..\tools\db_schema\hms-data.sql

ECHO "Successfully recreated database"
