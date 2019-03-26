import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbGCbdnyoBLaSEiiqYwdu0foAvwsjMSaI",
  authDomain: "reactclientpanel-d9247.firebaseapp.com",
  databaseURL: "https://reactclientpanel-d9247.firebaseio.com",
  projectId: "reactclientpanel-d9247",
  storageBucket: "reactclientpanel-d9247.appspot.com",
  messagingSenderId: "568133933351"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

firebase.initializeApp(firebaseConfig);

//const firestore = firebase.firestore();

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
});

//Create initial state
const initiaState = {};

// Create store

const store = createStoreWithFirebase(
  rootReducer,
  initiaState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
