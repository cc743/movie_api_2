# movie-api
This is the backend API for the myFlix application, a movie directory website.

## Getting Started with Postman
In order to get started, one must make a POST request in order to add a new user to the database at the following endpoint: https://evening-ridge-21612.herokuapp.com/users
- When registering, go to the "Body" tab and select the "raw" radio button. Select JSON from the dropdown menu. Enter a username, password, and email as shown below:
![Register Snip](/public/snip1_register.PNG)

Next, one must log in using a POST request to the following endpoint: https://evening-ridge-21612.herokuapp.com/login
-When logging in, go to the "Params" tab. Enter Username and Password (uppercase) in the "Key" section. Enter the user's username and password in the "Value" section: 
![Login Snip](/public/snip2_login.PNG)

Upon successful log in, copy the token created in the JSON response like shown below:

`"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmYXZvcml0ZU1vdmllIjpbXSwiX2lkIjoiNjAzZWY0ZDczNjQ5MTMwMDE3M2YxNGQ4IiwidXNlcm5hbWUiOiJ0cmFjeW1jZ3JhZHkiLCJwYXNzd29yZCI6IiQyYiQxMCRFYnpwTlB2bW9GYTJxNkVmcTZxOGZPd2dnTWc3VEJ5aUlsc1Awc2xuTnIzN2dva1ZNTmQzYSIsImVtYWlsIjoidHJhY3ltY2dyYWR5QGdtYWlsLmNvbSIsIl9fdiI6MCwiaWF0IjoxNjE0NzM5MjYzLCJleHAiOjE2MTUzNDQwNjMsInN1YiI6InRyYWN5bWNncmFkeSJ9.vXw71Zp3bDw13SYU0ZgB51OVn_SSRPc3dBmGK5OVRI0" `

Now, go to the "Auth" tab in Postman.  Select the "Bearer Token" option under "type" and paste the token into the input field as shown below: 

![Token Snip](/public/snip3_bearerToken.PNG)

Other api requests involving movies and users will require a bearer token. Make sure you have a token pasted into the above mentioned field. Otherwise, a 401 status error will prevent you from successfully making an api call.  A 401 status error signifies you are not authorized to access the endpoint.

Available movies and user endpoints (please note the use of "%20" to encode a space " " in the web address):

- Movies (Examples)
  - GET Request: https://evening-ridge-21612.herokuapp.com/movies - Get all movies
  - GET Request: https://evening-ridge-21612.herokuapp.com/movies/:Title - Get movie by title 
  (i.e. https://evening-ridge-21612.herokuapp.com/movies/The%20Ramen%20Girl)
  - GET Request: https://evening-ridge-21612.herokuapp.com/movies/genre/:genreName - Get movie genre by name (i.e. Western)
  - GET Request: https://evening-ridge-21612.herokuapp.com/movies/director/:directorName - Get director by name 
  (i.e. https://evening-ridge-21612.herokuapp.com/movies/Directors/Quentin%20Tarantino)

- Users (Examples)
  - POST Request: https://evening-ridge-21612.herokuapp.com/users - register a user (must include raw JSON info)
  - PUT Request: https://evening-ridge-21612.herokuapp.com/users/:Username - Edit user information by username (i.e. tracymcgrady)
  - POST Request: https://evening-ridge-21612.herokuapp.com/users/:username/movies/:movieID - Add movie to user's list of favorite movies 
  (i.e. https://evening-ridge-21612.herokuapp.com/users/tracymcgrady/movies/5f9775aa4f731ed4350df25d)
  - DELETE Request: https://evening-ridge-21612.herokuapp.com/users/:username/movies/:movieID - Delete movie from user's list of favorite movies
  (i.e. https://evening-ridge-21612.herokuapp.com/users/tracymcgrady/movies/5f97812701d0ee8d4abfed9f)
  - DELETE Request: https://evening-ridge-21612.herokuapp.com/users/:username - Delete a user from the database (a.k.a. deregister)
