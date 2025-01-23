# Fuel Finder 🚗⛽

Fuel Finder is a React Native application built using Expo to help users find nearby fuel stations and view fuel prices within a specified radius. The app leverages location-based services and integrates Google APIs to provide an intuitive and seamless user experience. The app is an MVP with scope for more features.

## Features
- 🔍 Search for locations using an autocomplete-powered search bar.
- 📍 Automatically fetch the user's current location with permission.
- 🗺️ View nearby fuel stations on a map.
- 🌍 Get precise geolocation using Google Geocoding API.

## Installation

### Prerequisites
- [Node.js](https://nodejs.org)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Watchman](https://facebook.github.io/watchman/docs/install.html) (for macOS users)

### Steps
- Clone the repository: git clone [Fuel-Finder Repo](https://github.com/ACullen97/fuel-finder.git)
-  Navigate to the project folder: cd fuel-finder
- Install dependencies: npm install
- Start the development server: npm start


### Environment Variables
The app uses Google APIs for geocoding and location autocomplete. 
We had some difficulty with storing our environment variables in Expo and have put them in the code for now
until we find a solution - You will have to Update the Google API key in the geocodeApi.tsx and autocompleteSearachBar.tsx files with your own api key - but be aware that it is not stored securely at the current time.

### Start the app on your device or emulator:
- npm run android
- npm run ios
- or use the Expo Go App
- Use the search bar to find a specific location or enable location permissions for automatic geolocation.
- View fuel stations near your location or the searched area on the map.

### Key Technologies
- React Native: Framework for building native apps.
- Expo: Simplified workflow for building React Native apps.
- Google Maps APIs (Geocode API and Places API): Used for geocoding and location autocomplete.
- petrol-Prices API: A python API that aggregates live fuel data for the UK
- Axios: For API requests.
- Lodash: To debounce user input in the search bar.

### Contributing
This is a student project and is not currently open to external contributions, therefore we will not accept any pull requests. However, feel free to
- Fork the repository.
- Clone your own version

### Project Details
This project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/) -  (January 2025)

### Petrol Pals Team Members
- [Alex Cullen](https://github.com/ACullen97)
- [Anastasia (Natasha) Kaldi](https://github.com/AnastasiaKaldi)
- [Kirsty Hall](https://github.com/swamphobbit22) 
- [Matthew Fard](https://github.com/Matthew7058) 
- [Yangmiqi (Micky) Xu](https://github.com/geekyMicky)
- [Stefan Brown](https://github.com/aangsquared)  
 
 