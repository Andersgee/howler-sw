//import { kek } from "./hmm";
import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";
import { kek } from "./bej";

declare var self: ServiceWorkerGlobalScope;

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      //const cache = await caches.open(CACHES.next)
      //await cache.add("/")
      await self.skipWaiting();

      console.log("SW: installed");
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // remove caches that aren't used anymore
      //const cacheNames = await caches.keys();
      //const appCaches = Object.values(CACHES);
      //await Promise.allSettled(
      //  cacheNames.filter((cacheName) => !appCaches.includes(cacheName)).map((cacheName) => caches.delete(cacheName))
      //);

      // immediately claim clients to avoid de-sync
      await self.clients.claim();

      console.log("SW: activated");
    })()
  );
});

//self.addEventListener("message", onMessage);
self.addEventListener("fetch", onFetch);
//self.addEventListener("push", onPush)

function onFetch(event: FetchEvent) {
  //may or may not check service worker cache here
  //see https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/preloadResponse#examples
  //lets keep it simple for now but atleast use the preloadResponse if it exists
  event.respondWith(
    (async () => {
      const response = await event.preloadResponse;
      if (response) {
        console.log("SW: returning preloadResponse instead of fetching");
        return response;
      }
      console.log("SW: returning regular fetch response");
      return fetch(event.request);
    })()
  );
}

//Note: The Firebase config object contains unique, but non-secret identifiers for your Firebase project.
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

onBackgroundMessage(messaging, (payload) => {
  console.log("SW: Received background message, payload:", payload);
  // Customize notification here
  self.registration.showNotification(payload.notification.title, {
    icon: "/icons/favicon-48x48.png",
    image: payload.notification.image,
    body: `SW (backgroundmessage): ${payload.notification.body}`,
  });
});

console.log("SW: 55 * kek(5):", 55 * kek(5));
