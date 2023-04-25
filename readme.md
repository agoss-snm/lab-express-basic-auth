![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png)

# LAB | Express Basic Auth

Project Done! 🚀

![giphy](https://user-images.githubusercontent.com/58647374/234331152-3546f026-2971-4d3c-a6dd-5b933365b25d.gif)


<br>

## | Sign Up

The users have the following information:

- **username**: must be unique in our application and will identify each user
- **password**:  encrypted (`bcryptjs` npm package).


<br>

The users stay logged in when going from a page to a page, after the refresh) using the `express-session` and `connect-mongo` npm packages to create a session.

<br>

## | Protected Routes

At this point, you have implemented the basic authentication in this application. Your next assignment is to create the authentication middleware and protect some routes. Refresher: users can't visit these routes unless they are authenticated (logged in and exist in the session).

The app have 2 different routes protected by authentication:

- `/main` - With a funny picture of a cat
- `/private` - `gif` cat

The views have the custom authentication middleware function and have a protect to prevent access to users who are not being authenticated.

<br><br>
