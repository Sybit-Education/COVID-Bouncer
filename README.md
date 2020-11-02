# COVID-Bouncer

## Background

Currently, we have to live by smart distancing because of SARS-CoV-2 the Corona-Virus.
A lot of bureaus for our teams are designed to have less than 1,50 meters distance for a save
between our colleagues. We have to close some places.

For sure, since March 2020 most of us work in homeoffice, also our trainees, which built
this app in a remote hackathon. But sometimes it is required to be together to work
on some special things. For this situation, we track in Excel sheets where we plan to work for the next days to solve two problems:

1. Reduce the amount of peoples within a room
2. Track the contacts

## Idea

The idea of this app is now to track and log the room occupancy by progressive web app using
QR codes:

* Scan QR code next to the door (or select manually) of the bureau to check in
* Scan QR code to reserve a place for the next day
* Track the lists for 14 days
* Add and edit rooms with their capacity

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
VUE_APP_FIREBASE_MESAGING_SENDER_ID="xxx"
VUE_APP_FIREBASE_APP_ID="xxxx"
VUE_APP_FIREBASE_MEASUREMENT_ID="xxxx"
```

You will get the values if you create a web application for Google Firestore.

### Configuration of Covid-Statistics

You have to add `.env` file in the root directory having following environment variable
to show statistics of your (German) county:

```javascript
VUE_APP_COVID_STATISTIC_OBJECT_ID_LIST="211,119,27,98,200"
```

It is a comma separated list of the object-ids to show data of these areas.

The `OBJECTID`s could be found on a map at:
[https://npgeo-corona-npgeo-de.hub.arcgis.com/datasets/917fc37a709542548cc3be077a786c17_0?geometry=-24.127%2C46.244%2C44.911%2C55.866]

## License

[MIT License](LICENSE)
