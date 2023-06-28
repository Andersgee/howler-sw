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
        //console.log("SW: returning preloadResponse instead of fetching");
        return response;
      }
      //console.log("SW: returning regular fetch response");
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

// Retrieve an instance of Firebase Messaging so that it can handle backgroundmessages.
const messaging = getMessaging(firebaseApp);

/*

//so apparently, "notification messages" (aka those with payload.notification not empty) are automatically shown
//but can use onBackgroundMessage for "data messages" (aka those with payload.data not empty)
//anyway, "data messages" dont event support payload.fcmOptions.link, which is where user is sent after clicking notification
//so seems like the purpose of this onBackgroundMessage() is only for "data messages", with custom actions by adding notificationclick listener etc
//https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/notificationclick_event
//https://firebase.google.com/docs/cloud-messaging/js/receive//
//https://firebase.google.com/docs/cloud-messaging/concept-options#messages-with-both-notification-and-data-payloads

onBackgroundMessage(messaging, (payload) => {
  console.log("SW: Received background message, payload:", payload);
  // Customize notification here
  
  //self.registration.showNotification(payload.notification.title, {
  //  icon: "/icons/favicon-48x48.png",
  //  image: payload.notification.image,
  //  body: `SW (backgroundmessage): ${payload.notification.body}`,
  //});
});


*/
