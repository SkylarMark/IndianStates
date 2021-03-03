const xlsx = require('node-xlsx');
const firebase = require("firebase/app");
const firestore = require("firebase/firestore");

var firebaseConfig = {
  // YOUR FIREBASE CONFIG
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

var obj = xlsx.parse('./Indian-States-and-Districts-List.xlsx');

let currentState;
let currentunionState;

// Sheet 1
obj[0].data.forEach((array) => {

  if (array[2] === "Union Territory") {

    const unionstate = array[0];
    const city = array[1];
    const type = array[2];

    if (currentState !== unionstate) {

      currentunionState = unionstate;

      db.doc(`/configurations/statesListing/unionTerritory/${unionstate}`).set({
        name: unionstate,
        timestamp: Date.now(),
      }).then((data) => {
        console.log(data);
      }).catch((error) => {
        console.log(error);
      });

    }

    db.doc(`/configurations/statesListing/unionTerritory/${state}/cities/${city}`).set({
      name: city,
      timestamp: Date.now(),
    }).then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log(error);
    });

  }

  if (array[2] !== "Union Territory") {
    const state = array[0];
    const city = array[1];
    const type = array[2];

    if (currentState !== state) {

      currentState = state;

      // console.log("STATE : " + state);

      db.doc(`/configurations/statesListing/states/${state}`).set({
        name: state,
        timestamp: Date.now(),
      }).then((data) => {
        console.log(data);
      }).catch((error) => {
        console.log(error);
      });
    }

    db.doc(`/configurations/statesListing/states/${state}/cities/${city}`).set({
      name: city,
      timestamp: Date.now(),
    }).then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log(error);
    });

    // console.log(" STATE : " + currentState + " CITY : " + city);
    // console.log(state);
    // console.log(city);
    // console.log(type);
  }

});