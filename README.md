# Covid-Bouncer

## Background

Curently we have to live by smart distancing because of SARS-CoV-2 the Corona-Virus.
A lot bureaus for our teams are designed to have less than 1,50 meters distance for save
between our colleagues. We have to close some places.

For shure, since March 2020 most of us work in homeoffice, also our trainees, which built
this app in an remote hackathon. but sometimes it is required to be together to work
on some special things. For these situation, we track in Excel sheets where we plan to work for the next days to solve two problems:

1. Reduce the amount of peoples within a room
2. Track the contacts

## Idea

The idea of this app is now to track and log the room occupancy by progressive web app using
QR codes:

* Scan QR code next to the door (or select manually) of the bureau to check in
* Scan QR code to reserve a place for the next day
* Track the lists for 14 days
* Add and edit rooms with their capaticity

## Solution

The app is a Quasar Framework app. For this hackathon we wanted to try two main technolories:

* Quasar, the vue.js Framework
* Google Firebase to persist data

## Development

### Install the dependencies

```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Start the PWA app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev:pwa
```

### Lint the files

```bash
npm run lint
```

### Build the app for production

```bash
quasar build
```

### Build the PWA-app for production

```bash
quasar build:pwa
```

### Customize the configuration

See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

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
to show statistics of your (German) Landkreis:

```javascript
VUE_APP_COVID_STATISTIC_OBJECT_ID_LIST="211,119,27,98,200"
```

It is a comma separated list of the object-ids to show data of these areas.

The `OBJECTID`s could be found on map at:
[https://npgeo-corona-npgeo-de.hub.arcgis.com/datasets/917fc37a709542548cc3be077a786c17_0?geometry=-24.127%2C46.244%2C44.911%2C55.866]

## License

[MIT License](LICENSE)

### 3rd Party

* [Quasar Framework](https://github.com/quasarframework/quasar/blob/dev/LICENSE)
* [Türsteher Vektoren von Vecteezy](https://de.vecteezy.com/gratis-vektor/t%C3%BCrsteher)
