import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";
//import { onBackgroundMessage } from "firebase/messaging/sw";
//import { kek } from "./bej";

declare var self: ServiceWorkerGlobalScope;

//ok, console logs show up in chrome but not in firefox
//console.log("SW: 99 * kek(9):", 99 * kek(9));

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      //https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/skipWaiting
      await self.skipWaiting();
      console.log("SW: installed");
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      //https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim
      await self.clients.claim();
      console.log("SW: activated");
    })()
  );
});

//adding a fetch listener is required to trigger install prompt on mobile?
self.addEventListener("fetch", (event) => {
  //https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent#examples
  // Let the browser do its default thing
  return;
  //https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith#examples
  //if (event.request.method !== "GET") {
  //  event.respondWith(
  //    (async () => {
  //      // Try to get the response from a cache.
  //      const cachedResponse = await caches.match(event.request);
  //      // Return it if we found one.
  //      if (cachedResponse) return cachedResponse;
  //      // If we didn't find a match in the cache, use the network.
  //      return fetch(event.request);
  //    })()
  //  );
  //}
});

//Note: The Firebase config object contains unique, but non-secret identifiers for your Firebase project.
const firebaseConfig = {
  apiKey: "AIzaSyAroe8n3vb7b9FooVuf8Q9UAXXcCIZ4SNI",
  authDomain: "howler-67f34.firebaseapp.com",
  projectId: "howler-67f34",
  storageBucket: "howler-67f34.appspot.com",
  messagingSenderId: "942074740899",
  appId: "1:942074740899:web:f7b3aec1d8bead76b2ff16",
};

const firebaseApp = initializeApp(firebaseConfig);
// Retrieve an instance of Firebase Messaging so that it can handle backgroundmessages.
const messaging = getMessaging(firebaseApp);
