# Onramp Fullstack Take Home Project

## Overview 🤖

This is a web application that allows a user to signup/login to a site, write a short blog post, view a blog post, and do other interactions with blog posts. The idea was to create something that would keep the user's posts short and sweet; similar to Twitter posts.

## Description and Details

On the backend this app uses PostgreSQL for the database, and Node and Express for routing endpoints.
A custom middleware was created to handle user authentication but maybe using Passport.js middleware would have been more streamlined. A fair amount of development time was spent working on just the middleware and perhaps using the third party Passport middleware would have been faster.

1. DB structure - consists of two tables, one for users , and one for blog posts. Since one user can be the author of multiple posts, the user ID is referenced as the Foreign Key in posts table which can allow us to get all posts by that particular user.

2. Controllers/Routes - The logic in charge of interactions with user data and post data are given their own dedicated set of controllers and routes

On the frontend the app uses React created from the create-react-app boilerplate with typescript template extension. Additionally, routes on the frontend were handled with the React-Router-Dom package. Styling was done with bootstrap becuase it's layouts and stylings can be applied to a large range of situations and structures. Also, it can be good for cross platform support and general user accesibility when used in combination with a developers own additional styling, and scripting. UI components can be thought of as being a part of two categories:

#### Post Related Components

Component that deals with interacting with posts(writing a post, searching, deleting). Here a user can create, read and delete from DB

![view of the signup page](https://github.com/chadhindsight/onramp_fs/tree/main/photos/onramp_pic.png)

#### User Dashboard/Profile

Componenets that deal with the profile and signing in(updating user info, etc).
![view of the login page](https://github.com/chadhindsight/onramp_fs/tree/main/photos/onramp_pic2.png)

![view of the signup page](https://github.com/chadhindsight/onramp_fs/tree/main/photos/onramp_pic3.png)

#### UI Design Intention

By given the site a minimal color pallete and fairly plain layout, this ensures users can focus on the information presented. The navigation functionality is also available from a keyboard in case users cannot use a mouse or need to use some assistive technologies. I also thought of the UI component structure as being divided into Posts and Users sections similar to the backend layout.

### Submission

Here is the link to the project [repository] (https://github.com/chadhindsight/onramp_fs)

#### TODO:

1. Add more UI component tests
2. Add a search bar that dynamically filters suggested results when user enters input
3. Double check a bug that prevents DB search from consistenly filtering out mismatched post ids
