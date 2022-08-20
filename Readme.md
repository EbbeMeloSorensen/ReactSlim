# Backend

## Making a new migration after having changed the Domain and Persistence projects

`dotnet ef migrations add InitialMigration -p Persistence -s API`

(remember to recreate the database, e.g. when using Sqlite afterwards)

## Running the backend

`dotnet watch run`

(in the 'Backend' folder)

## Just compiling the backend

`dotnet build`

(in the 'Backend' folder)

# Frontend

## Preparing the Frontend

`npm install`

(In the client-app folder)

## Running the Frontend

`npm start`

(In the client-app folder)