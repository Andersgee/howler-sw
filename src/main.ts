//import { kek } from "./hmm";
import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";
import { kek } from "./bej";

declare var self: ServiceWorkerGlobalScope;

const firebaseConfig = {
  apiKey: "AIzaSyAroe8n3vb7b9FooVuf8Q9UAXXcCIZ4SNI",
  authDomain: "howler-67f34.firebaseapp.com",
  projectId: "howler-67f34",
  storageBucket: "howler-67f34.appspot.com",
  messagingSenderId: "942074740899",
  appId: "1:942074740899:web:f7b3aec1d8bead76b2ff16",
};

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp(firebaseConfig);

const messaging = getMessaging(firebaseApp);

console.log("messaging:", messaging);

const a = 55;
const b = a * kek(5);
console.log("b:", b);
