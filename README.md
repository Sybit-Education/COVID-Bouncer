# COVID-Bouncer
[![Sybit](https://img.shields.io/badge/-Sybit-b71583.svg)](https://www.sybit.de/)
![Node.js CI](https://github.com/Sybit-Education/COVID-Bouncer/workflows/Node.js%20CI/badge.svg?branch=master)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/Sybit-Education/COVID-Bouncer/blob/master/LICENSE)
## Background

Currently, we have to live by smart distancing because of SARS-CoV-2 the Corona-Virus.
A lot of bureaus for our teams are designed to have less than 1,50 meters distance for a save
between our colleagues. We have to close some places.

For sure, since March 2020 most of us work at home, also our trainees, which built
this app in a remote hackathon. But sometimes it is required to be together to work
on some special things. For this situation, we track in Excel sheets where we plan to work for the next days to solve two problems:

1. Reduce the amount of peoples within a room
2. Track the contacts

## Features

The feature of this app is now to track and log the room occupancy by progressive web app using
QR codes:

* Scan QR code next to the door (or select manually) of the bureau to check in (In work)
* Scan QR code to reserve a place for the next day (In work)
* Track the lists for 14 days (Done)
* Add and edit rooms with their capacity (Done)

## Solution

The app is a Vue.js app. For this hackathon we wanted to try two main technologies:

* Vue.js
* Google Firebase to persist data

## Development
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Configuration of Firebase

You have to add `.env` file in the root directory having following environment variables:

```javascript
VUE_APP_FIREBASE_API_KEY="API-Key"
VUE_APP_FIREBASE_AUTH_DOMAIN="xxxx"
VUE_APP_FIREBASE_DATABASE_URL="xxx"
VUE_APP_FIREBASE_PROJECT_ID="xxx"
VUE_APP_FIREBASE_STORAGE_BUCKET="xxxx"
VUE_APP_FIREBASE_MESSAGING_SENDER_ID="xxx"
VUE_APP_FIREBASE_APP_ID="xxxx"
VUE_APP_FIREBASE_MEASUREMENT_ID="xxxx"
```
You will get the values if you create a web application for Google Firestore.

## Deployment setup
### Before
```
npm install -g firebase-tools
```
```
firebase login
```
### Deploying a Vue Site with Firebase Hosting
https://www.youtube.com/watch?v=a-0W40NM0dI

## Manually deployment
### Serve before deploy
```javascript
npm run test-deploy
```
```javascript
npm run deploy
```

## License

[MIT License](LICENSE)
