# Technical test

## Introduction

Fabien just came back from a meeting with an incubator and told them we have a platform “up and running” to monitor people's activities and control the budget for their startups !

All others developers are busy and we need you to deliver the app for tomorrow.
Some bugs are left and we need you to fix those. Don't spend to much time on it.

We need you to follow these steps to understand the app and to fix the bug :

- Sign up to the app
- Create at least 2 others users on people page ( not with signup )
- Edit these profiles and add aditional information
- Create a project
- Input some information about the project
- Input some activities to track your work in the good project

Then, see what happens in the app and fix the bug you found doing that.

## Then

Time to be creative, and efficient. Do what you think would be the best for your product under a short period.

### The goal is to fix at least 3 bugs and implement 1 quick win feature than could help us sell the platform

## Setup api

- cd api
- Run `npm i`
- Run `npm run dev`

## Setup app

- cd app
- Run `npm i`
- Run `npm run dev`

## Finally

Send us the project and answer to those simple questions :

- What bugs did you find ? How did you solve these and why ?
- bugs that I have treated :

1. the .env that contains the database url is not mentionned in gitignore file, I had to make sure it does not exists in the remote repository when I pushed again.
2. fix fetching the project from the database so that we can no longer have a bug in the frontend.
3. handling the error of existing project when creating one in the frontend, showing the error thanks to toast.
4. update the user list when changing from available to not available using redux.
5. when selecting project, key has to be unique which is one the basics of the virtual dom.
6. same thing for activities, key has to be unique, and also the fields.
7. the Nan% and undefined in the placeholder and adjusted.
8. when we create a project, we add it to the project list (view) rather than refreshing the page.
9. also key has to be unique in scenes porject lists.
10. change username to name when creating a new user so that the value can be properly stored in db and fetched in the user page.
11. fix user update.
12. in the API services, refactor CRUD methods to reduce complexity, it's basically saying we are returning a promise inside a promise.

- Which feature did you develop and why ?
- given the few time that i had left i thought of nthg else than showing the timeline of projects so that we can keep track of them which is very important
- Do you have any feedback about the code / architecture of the project and what was the difficulty you encountered while doing it ?
- typescript is a must, errors are not properly handled in the backend, an error handler (middleware should be added) and
  also routes.
  functions are passed directly to the onChange, onClick etc.. which is bad practice in React (every time the component re-renders, a new instance of the function is created) the solution would be to avoid unnecessary function re-creation by moving the function outside of the render cycle, and also we have a cleaner code (the function logic is encapsulated separately, making the JSX code cleaner and easier to maintain)
  error code constants should be created in a enum in a separate file.
  Craftmaship should be adapted in the project.
  tests should be implemented (unit tests for both frontend and backend).
