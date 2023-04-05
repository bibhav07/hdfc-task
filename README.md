# Movie ticket booking
Hosted link - https://hdfc-task.onrender.com/api/v1/showtimes/shows

# Project structure and small overview
This is movie ticket booking api, where user can search or view all cinemas with show time in city, or movies accordingly and book the tickets. I'm following MVC architectural pattern, that separates an application into logical components. This project is using JWT, json web token for authorization, bcrypt module for encoding the user password, multiple security/network packages. Custom error handling as well as 3rd party package usage for handling error, error first callback pattern, middleware, best folder structure and file structure and much more.

# Project Setup
Download or clone this repository.

You will get all the folder and files - controllers, modules, db ...etc

# Installing dependencies
Open up the command prompt and do npm install, it will install all the dependencies used in project. Open package.json and look for scripts object. Here are two properties "start" which is used for production environment and "dev" which we are using for development environment.

# .env file Setup
After downloading the project, create a file by name .env, this file contains all the environment variables which will be used in the project.
We will setup 3 environt variables : 

MONGODB_URI = mongodb+srv://YOU_USERNAME:YOU_PASSWORD@cluster0.fykf0.mongodb.net/YOUR_DATABASE?retryWrites=true&w=majority

JWT_SECRET=hdfcsecret

JWT_LIFETIME=1d

# Starting the server
# npm run dev
After instaling dependencies, hit npm run dev in command prompt. Server will start on port 5000 if port number is not changed.

Open your api testing software and paste http://localhost:5000/api/v1/showtimes/shows or according to your port. If you get a simple response list of all shows, congratulations our api is running fine.

# Using our hosted api

# using auth api for sign-up and log-in

1. User signup - https://hdfc-task.onrender.com/api/v1/auth/signup 

send body eg :

{ 

    "username" : "test", 
    "email" : "test@gmail.com", 
    "password" : "test123" 

}

response - if email is not already in use - "user created"

2. User login - https://hdfc-task.onrender.com/api/v1/auth/login

send body eg : 

{

    "email" : "test@gmail.com", 
    "password" : "test123" 
}

response - if email and password right - {message : "user logged in", status : "success", token : "xyz..." }

save this token, will use this token to book a ticket because only logged in user is allowed to access book ticket route

# Fetch all movies playing in your city along with showtime, movie and cinema

endpoint - https://hdfc-task.onrender.com/api/v1/showtimes/city/YOUR_CITY

eg - https://hdfc-task.onrender.com/api/v1/showtimes/city/Mumbai

respone :

{
    city : "Mumbai",
    totalShows : 2,
    shows : [....]
}

# Fetch all cinemas playing particular movie

endpoint - https://hdfc-task.onrender.com/api/v1/showtimes/movie/YOUR_MOVIE_NAME

eg - https://hdfc-task.onrender.com/api/v1/showtimes/movie/3 Idiots

response : list of all cinemas playing 3 Idiots along with cinema

{
    movieShowTime : [....]

}

# Fetch particular show time

endpoint -https://hdfc-task.onrender.com/api/v1/showtimes/show/SHOW_ID

eg - https://hdfc-task.onrender.com/api/v1/showtimes/show/642bbed5fdd1b5f4c970e2d5

response - details of this show for eg : show time, movie name, cinema and seat booked

# Book a seat
















