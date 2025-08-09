#### Travel Planner - Frontend

## Overview
This is the **React Native frontend** for the Travel Planner app.  
It provides a **user-friendly interface** for users to login, create trips, upload documents, and navigate smoothly with real-time updates.

## Features
- **User Authentication:** Secure login and logout functionality  
- **Trip Management:** Create, view, update, and delete trips  
- **Document Upload:** Upload and manage documents related to trips  
- **Real-time Interaction:** Instant UI updates and seamless navigation  
- **Responsive Design:** Optimized for multiple device sizes
  
## Project structure

TravelPlanner-frontend/
├── app/                    #app folder**
    ├──components/           #components used in the projects
          ├──  login.js            #login screen function
          ├──  signUp.js            # signup screen function
    ├──screens/              #screens in th projects
       ├──dashboard/          # main functionality screen folder
             ├── _layout.js        #navigation bar layout
             ├── documents.js
             ├── home.js
             ├── profile.js
             ├──trip.js
   ├── index.js            # redirection 
   ├── welcome.js          #welcome screen
 ├──assets/                #pictures and other images used folder


## Technologies Used
- React Native 
- AsyncStorage for local data persistence  
- Tailwind CSS via `twrnc` for styling  
- Expo Vector Icons for UI icons  

## Getting Started
Running the App
npx expo start
Start the server:
npm start
### Prerequisites
- Node.js and npm installed  
- Expo installed (`npm install -g expo-cli`)  
- Android Studio / Xcode (for device emulators) or a physical device or expo go app 

### Installation
1. Clone the repo  
   https://github.com/suman03-en/TravelPlanner-backend.git
2. install dependencies
    npm install

### Outcomes
User Authentication
Users can register and log in securely using the provided login and sign-up components.

Dashboard Navigation
Smooth navigation across multiple dashboard screens including home, profile, documents, and trip details.

Document Management
Users can upload, view, and manage documents related to their trips.

Responsive UI
The app provides a user-friendly interface that works seamlessly across different devices and screen sizes.

