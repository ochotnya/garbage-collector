This is a Next.js application, which allows you to store notes, share them with other users. Notes are automatically disposed at a time specified by the user.

## Hosting
App is hosted on Heroku: https://garbage-collector-app.herokuapp.com/
It is connected to this repository, so the applications is automatically updated.

## Logging in
To log in you can create new account or use your Google account. All authorization and authentication processes are handled by auth0 services

## How to use?
Right now the functionality is very basic. You can add new item using the "+" in top left corner. Add your text, define who can see it by adding user emails and set the expiration date. Newly created item will be saved and available to you and specified users. You can remove item manualy using the bin icon.

## Database
This application connects to MongoDB which stores all users items. MongoDB also handles automatic removal of these items by using TTL index.
